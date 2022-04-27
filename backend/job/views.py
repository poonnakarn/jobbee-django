from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Avg, Min, Max, Count
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated

from .serializers import JobSerializer
from .models import Job
from .filters import JobsFilter

from django.shortcuts import get_object_or_404


@api_view(["GET"])
def getAllJobs(request):

    # jobs = Job.objects.all()
    filterset = JobsFilter(request.GET, queryset=Job.objects.all().order_by("id"))

    count = filterset.qs.count()

    # Pagination
    resPerPage = 3

    paginator = PageNumberPagination()
    paginator.page_size = resPerPage

    queryset = paginator.paginate_queryset(filterset.qs, request)

    serializer = JobSerializer(queryset, many=True)
    return Response(
        {
            "count": count,
            "resPerPage": resPerPage,
            "jobs": serializer.data,
        }
    )


@api_view(["GET"])
def getJob(request, pk):
    job = get_object_or_404(Job, id=pk)

    serializer = JobSerializer(job, many=False)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def newJob(request):
    request.data["user"] = request.user
    data = request.data

    job = Job.objects.create(**data)

    serializer = JobSerializer(job, many=False)
    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateJob(request, pk):
    job = get_object_or_404(Job, id=pk)

    if job.user != request.user:
        return Response(
            {"message": "You cannot update this job."}, status=status.HTTP_403_FORBIDDEN
        )

    job.title = request.data["title"]
    job.description = request.data["description"]
    job.email = request.data["email"]
    job.address = request.data["address"]
    job.jobType = request.data["jobType"]
    job.education = request.data["education"]
    job.industry = request.data["industry"]
    job.experience = request.data["experience"]
    job.salary = request.data["salary"]
    job.position = request.data["position"]
    job.company = request.data["company"]

    job.save()

    serializer = JobSerializer(job, many=False)

    return Response(serializer.data)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def deleteJob(request, pk):
    job = get_object_or_404(Job, id=pk)

    if job.user != request.user:
        return Response(
            {"message": "You cannot update this job."}, status=status.HTTP_403_FORBIDDEN
        )

    job.delete()

    return Response({"message": "Job is deleted."}, status=status.HTTP_200_OK)


@api_view(["GET"])
def getTopicStats(request, topic):
    args = {"title__icontains": topic}
    jobs = Job.objects.filter(**args)

    if len(jobs) == 0:
        # no job found
        return Response({"message": "No stats found for {topic}".format(topic=topic)})

    stats = jobs.aggregate(
        total_jobs=Count("title"),
        avg_positions=Avg("positions"),
        avg_salary=Avg("salary"),
        min_salary=Min("salary"),
        max_salary=Max("salary"),
    )

    return Response(stats)
