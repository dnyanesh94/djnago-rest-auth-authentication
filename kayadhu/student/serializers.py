from rest_framework import serializers
from .models import (Student,StudentAddress,
	StudentImage,StudentContact,
	StudentParent)

class StudentSerializer(serializers.ModelSerializer):
	class Meta:
		model = Student
		fields = ('id', 'first_name', 'middle_name',
			'last_name','mother_name','birth_date','gender',
			'blood_group','caste','religion',
			'birth_place','identification_mark')

class StudentImageSerializer(serializers.ModelSerializer):
	class Meta:
		model = StudentImage
		fields = ('id', 'student_id', 'image')


class StudentAddressSerializer(serializers.ModelSerializer):
	class Meta:
		model = StudentAddress
		fields = ('id','student_id','address_type',
			'address_line1','address_line2','location',
			'city','state','country','pincode')

	# def create(self, validated_data):
	# 	school = School.objects.create(**validated_data)
		
	# 	locations = validated_data.pop('locations')
	# 	for location in locations:
	# 	    Location.objects.create(school=school, **location)
		
	# 	courses = validated_data.pop('courses')
	# 	for course in courses:
	# 		Course.objects.create(school=school,**course)
	# 	return school    

	# def update(self, instance, validated_data):
	# 	import ipdb;ipdb.set_trace();

class StudentContactSerializer(serializers.ModelSerializer):
	class Meta:
		model = StudentContact
		fields = ('id','student_id','contact_type',
			'std_code','number')

class StudentParentSerializer(serializers.ModelSerializer):
	class Meta:
		model = StudentParent
		fields = ('id','student_id','parent_type',
			'first_name','middle_name','last_name')

