
from rest_framework.serializers import ModelSerializer
from djangojobboard.jobs.models import Job

class JobSerializer(ModelSerializer):
    class Meta:
        model = Job
        fields = (
            "id",
            "title",
            
            "user",
            "company_name",
            "company_website",
            "compamy_logo",
            
            "location",
            "remote",
            "salary",
            "available",
            "date_created",
        )
        read_only_fields = ("date_created", "user")