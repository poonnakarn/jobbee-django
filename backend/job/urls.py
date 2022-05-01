from django.urls import path
from . import views

urlpatterns = [
    path("jobs/", views.get_all_jobs, name="jobs"),
    path("jobs/<int:pk>", views.get_job, name="job"),
    path("jobs/new/", views.new_job, name="new_job"),
    path("jobs/<int:pk>/update/", views.update_job, name="update_job"),
    path("jobs/<int:pk>/delete/", views.delete_job, name="delete_job"),
    path("stats/<str:topic>/", views.get_topic_stats, name="get_topic_stats"),
    path("jobs/<int:pk>/apply/", views.apply_job, name="apply_job"),
    path(
        "me/jobs/applied/",
        views.get_current_user_applied_jobs,
        name="get_current_user_applied_jobs",
    ),
    path("jobs/<int:pk>/check/", views.is_applied, name="is_applied"),
    path("me/jobs/", views.get_current_user_jobs, name="get_current_user_jobs"),
    path(
        "job/<int:pk>/candidates/",
        views.get_candidates_applied,
        name="get_candidates_applied",
    ),
]
