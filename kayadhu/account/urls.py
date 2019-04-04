from django.contrib import admin
from django.conf.urls import include, url
from rest_auth.views import (LoginView,LogoutView,UserDetailsView,
							PasswordChangeView,PasswordResetView,
							PasswordResetConfirmView
							)

from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView, RedirectView

# urlpatterns = [
#     path('admin/', admin.site.urls),
# ]

urlpatterns = [
    # url(r'^api/', include('rest_auth.urls'))
    url(r'login/',  csrf_exempt(LoginView.as_view()),name='login'),
    url(r'logout/',  LogoutView.as_view(),name='logout'),
    url(r'user/', UserDetailsView.as_view(),name='user_details'),
    url(r'password/change/',PasswordChangeView.as_view(),name='password_change'),
    url(r'password/reset/confirm/',PasswordResetConfirmView.as_view(),name='password_reset_confirm'),
    url(r'password/reset/',PasswordResetView.as_view(),name='password_reset')
    

]

