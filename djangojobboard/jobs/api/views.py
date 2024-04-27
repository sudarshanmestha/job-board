import stripe
import datetime
from .serializers import JobSerializer
from .permissions import IsOwner
from django.conf import settings
from django.core.mail import send_mail
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.views import APIView
from djangojobboard.jobs.models import Job, SponsoredJobPost
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated

# This is your test secret API key.
stripe.api_key = settings.STRIPE_SECRET_KEY



class JobListView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = JobSerializer
    
    def get_queryset(self):
        return Job.objects.filter(available=True).order_by("-date_created")
    
    
class JobCreateView(CreateAPIView):
    permission_classes = [IsAuthenticated]  
    serializer_class = JobSerializer
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
class JobDetailView(RetrieveAPIView):
    permission_classes = [AllowAny]  
    serializer_class = JobSerializer
    
    def get_queryset(self):
        return Job.objects.all()   
        
class JobUpdateView(UpdateAPIView):
    permission_classes = [IsAuthenticated, IsOwner]  
    serializer_class = JobSerializer
    
    def get_queryset(self):
        return Job.objects.filter(available=True)  
    
    
    
class JobDeleteView(DestroyAPIView):
    permission_classes = [IsAuthenticated, IsOwner]  
    
    def get_queryset(self):
        return Job.objects.all()  
    
class SponsoredJobCountView(APIView):
    def get(self, request, *args, **kwargs):
        job_count = Job.objects.filter(sponsored=True).count()
        return Response({"job_count": job_count})
    
class CreatePaymentView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            intent = stripe.PaymentIntent.create(
                amount=10000,  # 10
                currency="inr",
                automatic_payment_methods={
                    "enabled": True,
                },
                metadata={
                    "job_id": request.data["job_id"]
                }
            )
            return Response({"clientSecret": intent["client_secret"]})
        except Exception as e:
            return Response({"error": str(e)}, status=403)
        
        
# webhooks - link the payment intent to sponsotedJobPost
@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']
    event = None

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except ValueError as e:
        # Invalid payload
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        return HttpResponse(status=400)


    print(event)
    if event["type"] == "payment_intent.succeeded":
        intent = event['data']['object']

        job_id = intent["metadata"]["job_id"]
        job = Job.objects.get(id=job_id)
        # create the sponsored jobpost
        print(job)
        SponsoredJobPost.objects.create(
            job=job,
            date_until=datetime.date.today() + datetime.timedelta(days=7),
            stripe_payment_intent_id=intent["id"]
            
        )
        
        job.sponsored = True
        job.save()
        
        send_mail(
            subject="Your sonsored job post is live!",
            message=f"Thanks for your purchase. YOur job {job.title} is now sponsored",
            recipient_list=[job.user.email],
            from_email="your@email.com"
        )

    return HttpResponse(status=200)