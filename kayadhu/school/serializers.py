from rest_framework import serializers
from .models import School,Location,Course


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ('id','location_name','address_1',
        	'address_2','city','state',
        	'postal_code','country')


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('id','course_name','course_type',
        	'course_year','course_description')


class SchoolSerializer(serializers.ModelSerializer):
	locations = LocationSerializer(many=True)
	courses  = CourseSerializer(many=True)

	class Meta:
	    model = School
	    fields = ('id','school_name', 'school_type', 'school_description','locations','courses')

	def create(self, validated_data):
		school = School.objects.create(**validated_data)
		
		locations = validated_data.pop('locations')
		for location in locations:
		    Location.objects.create(school=school, **location)
		
		courses = validated_data.pop('courses')
		for course in courses:
			Course.objects.create(school=school,**course)
		return school    

	def update(self, instance, validated_data):
        
		instance.school_name = validated_data.get('school_name', instance.school_name)
		instance.school_type = validated_data.get('school_type', instance.school_type)
		instance.school_description = validated_data.get('school_description', instance.school_description)
		instance.save()

		location_data = validated_data.pop('locations')
		locations = (instance.locations).all()
		locations = list(locations)
		for loc in location_data:
			if locations:
				location = locations.pop(0)
				
				location.location_name = loc.get('location_name', location.location_name)
				location.address_1 = loc.get('address_1', location.address_1)
				location.address_2 = loc.get('address_2', location.address_2)
				location.city = loc.get('city',location.city)
				location.state = loc.get('state',location.state)
				location.postal_code = loc.get('postal_code',location.postal_code)
				location.save()
			else:
				Location.objects.create(school=instance, **loc)
	

		course_data = validated_data.pop('courses')
		courses = (instance.courses).all()
		courses = list(courses)

		for c in course_data:
			if courses:
				course = courses.pop(0)
				course.course_name = c.get('course_name',course.course_name)
				course.course_type = c.get('course_type',course.course_type)
				course.course_year = c.get('course_year',course.course_year)
				course.course_description = c.get('course_description',course.course_description)
				course.save()
			else:
				Course.objects.create(school=school,**c)		
		return instance


