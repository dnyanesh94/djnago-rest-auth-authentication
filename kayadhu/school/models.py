from django.db import models

# Create your models here.

class School(models.Model):
    school_name = models.CharField(max_length=100)
    school_type = models.CharField(max_length=100)
    school_description = models.TextField()


class Location(models.Model):
    school = models.ForeignKey(School,related_name='locations',on_delete=models.CASCADE)
    location_name = models.CharField(max_length=100)
    address_1 = models.CharField(max_length=100)
    address_2 = models.CharField(max_length=100, blank=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100)


class Course(models.Model):
    school = models.ForeignKey(School,related_name='courses',on_delete=models.CASCADE)
    # location = models.ForeignKey(Location, related_name='courses')
    course_name = models.CharField(max_length=100)
    course_type = models.CharField(max_length=100)
    course_year = models.CharField(max_length=100)
    course_description = models.TextField() 
    # students = models.ManyToManyField(User, related_name="course_students")
