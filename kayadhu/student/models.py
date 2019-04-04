from django.db import models
from django.conf import settings
from django.db.models.signals import post_delete,pre_save,post_save
from django.dispatch import receiver
import os.path



class Student(models.Model):
	GENDER_CHOICES = (
	    ('M', 'Male'),
	    ('F', 'Female'),
	    ('O','Other')
	)
	first_name = models.CharField(max_length=50,)
	middle_name = models.CharField(max_length=50,blank=True,null=True)
	last_name = models.CharField(max_length=50,blank=True,null=True)
	mother_name = models.CharField(max_length=50,blank=True,null=True)
	birth_date = models.DateField(auto_now=False, auto_now_add=False,blank=True,null=True)
	birth_place = models.CharField(max_length=50,blank=True,null=True)
	gender = models.CharField(
	    max_length=1,
	    choices=GENDER_CHOICES,
	    default='M',
		blank=True,
		null=True
	)
	blood_group = models.CharField(max_length=10,blank=True,null=True)
	caste = models.CharField(max_length=50,blank=True,null=True)
	religion = models.CharField(max_length=50,blank=True,null=True)
	identification_mark = models.TextField(blank=True,null=True)




def student_image_handler(instance, filename):
    fn, ext = os.path.splitext(filename)
    # import ipdb;ipdb.set_trace();
    return "student/profile/images/{id}{ext}".format(id=instance.student_id_id, ext=ext)

class StudentImage(models.Model):
	# student_id = models.ForeignKey(Student, on_delete=models.CASCADE)
	student_id = models.OneToOneField(
        Student,
        on_delete=models.CASCADE
    )
    
	image = models.ImageField(upload_to=student_image_handler,blank=True,null=True)


@receiver(post_delete, sender=StudentImage)
def delete_thumbnail(sender, instance, **kwargs):
    instance.image.delete(False)

@receiver(pre_save, sender=StudentImage)
def change_thumbnail(sender, instance, **kwargs):   
    if not instance.pk:
        return False

    try:
        old_file = StudentImage.objects.get(pk=instance.pk).image
    except StudentImage.DoesNotExist:
        return False
    new_file = instance.image
    if not old_file == new_file:
        if os.path.isfile(old_file.path):
            os.remove(old_file.path)    





class StudentAddress(models.Model):
	ADDRESS_TYPE_CHOICES = (
	    ('TMP', 'Temporary'),
	    ('PMT', 'Permanent')
	)

	student_id = models.ForeignKey(Student, on_delete=models.CASCADE)
	address_type = models.CharField(
	    max_length=3,
	    choices=ADDRESS_TYPE_CHOICES,
	    default='PMT',
	    blank=True,
	    null=True
	)
	address_line1 = models.TextField()
	address_line2 = models.TextField(blank=True,null=True)
	location = models.CharField(max_length=50,blank=True,null=True)
	city = models.CharField(max_length=50,blank=True,null=True)
	state = models.CharField(max_length=50,blank=True,null=True)
	country = models.CharField(max_length=50,blank=True,null=True)
	pincode = models.CharField(max_length=50,blank=True,null=True)


class StudentContact(models.Model):
	

	student_id = models.ForeignKey(Student, on_delete=models.CASCADE)
	contact_type = models.CharField(max_length=20,blank=True,null=True)
	std_code = models.CharField(max_length=5,blank=True,null=True)
	number = models.CharField(max_length=15,)

class StudentParent(models.Model):
	student_id = models.ForeignKey(Student, on_delete=models.CASCADE)
	parent_type = models.CharField(max_length=50,blank=True,null=True)
	first_name = models.CharField(max_length=50,)
	middle_name = models.CharField(max_length=50,blank=True,null=True)
	last_name = models.CharField(max_length=50,blank=True,null=True)
	
	

