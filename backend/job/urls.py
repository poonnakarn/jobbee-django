from django.urls import path
from . import views

urlpatterns = [
    path("jobs/", views.getAllJobs, name="jobs"),
    path("jobs/<int:pk>", views.getJob, name="job"),
    path("jobs/new/", views.newJob, name="new_job"),
    path("jobs/<int:pk>/update/", views.updateJob, name="update_job"),
    path("jobs/<int:pk>/delete/", views.deleteJob, name="delete_job"),
    path("stats/<str:topic>/", views.getTopicStats, name="get_topic_stats"),
    path("jobs/<int:pk>/apply/", views.apply_job, name="apply_job"),
    path(
        "me/jobs/applied/",
        views.get_current_user_applied_jobs,
        name="get_current_user_applied_jobs",
    ),
]
