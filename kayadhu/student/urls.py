from django.contrib import admin
from django.urls import path

from django.views.decorators.csrf import csrf_exempt
from django.conf.urls import include, url

from .views import ( StudentList,StudentDetail,
	StudentAddressList,StudentAddressDetail,
	StudentImageList,StudentImageDetail,
	StudentContactList,StudentContactDetail,StudentParentList,
	StudentParentDetail)


urlpatterns = [
	url(r'student/list/',StudentList.as_view(), name='student_list'),
 	url(r'student/detail/(?P<pk>\d+)/',StudentDetail.as_view(), name='student_details'),
 	url(r'student/address/list/',StudentAddressList.as_view(), name='student_address_list'),
 	url(r'student/address/detail/(?P<pk>\d+)/',StudentAddressDetail.as_view(), name='student_address_details'),
 	url(r'student/image/list/',StudentImageList.as_view(), name='student_image_list'),
 	url(r'student/image/detail/(?P<pk>\d+)/',StudentImageDetail.as_view(), name='student_image_details'),
 	url(r'student/contact/list/',StudentContactList.as_view(), name='student_contact_list'),
 	url(r'student/contact/detail/(?P<pk>\d+)/',StudentContactDetail.as_view(), name='student_contact_details'),
	url(r'student/parent/list/',StudentParentList.as_view(), name='student_contact_list'),
 	url(r'student/parent/detail/(?P<pk>\d+)/',StudentParentDetail.as_view(), name='student_contact_details'),
 	

]
