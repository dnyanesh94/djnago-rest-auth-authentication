from django.conf import settings

def global_settings(request):
    # return any necessary values
    return {'password_reset': settings.PASSWORD_RESET_CONFIRM_URL}
