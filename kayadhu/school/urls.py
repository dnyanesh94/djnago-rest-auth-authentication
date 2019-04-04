from django.contrib import admin
# from django.views.decorators.csrf import csrf_exempt

from django.conf.urls import include, url



from .views import SchoolList,SchoolDetail


# urlpatterns = [
#     path('admin/', admin.site.urls),
# ]

urlpatterns = [
    url(r'list/',SchoolList.as_view(), name='school_list'),
 	url(r'detail/(?P<pk>\d+)/',SchoolDetail.as_view(), name='school_details'),
]