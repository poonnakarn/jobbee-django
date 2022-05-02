from django.urls import include
from django.contrib import admin
from django.urls import path

# from django.conf.urls import handler404, handler500

from rest_framework_simplejwt.views import TokenObtainPairView, TokenVerifyView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("job.urls")),
    path("api/", include("account.urls")),
    path("api/token/", TokenObtainPairView.as_view()),
    path("api/token/verify/", TokenVerifyView.as_view()),
]

handler404 = "utils.error_views.handler404"
handler500 = "utils.error_views.handler500"
