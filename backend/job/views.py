from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import JobSerializer
from .models import Job


@api_view(["GET"])
def getAllJobs(request):

    jobs = Job.objects.all()

    serializer = JobSerializer(jobs, many=True)
    return Response(serializer.data)
