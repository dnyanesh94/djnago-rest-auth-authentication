from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import (Student,StudentAddress,
    StudentImage,StudentContact,StudentParent)

from .serializers import (StudentSerializer,StudentAddressSerializer,
    StudentImageSerializer,StudentContactSerializer,StudentParentSerializer)

import base64


class StudentList(APIView):
    """
    List all snippets, or create a new snippet.
    """
    def get(self, request, format=None):
        students = Student.objects.all()
        
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StudentDetail(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    def get_object(self, pk):
        try:
            return Student.objects.get(pk=pk)
        except Student.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        student = self.get_object(pk)        
        serializer = StudentSerializer(student)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        student = self.get_object(pk)
        serializer = StudentSerializer(student, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        student = self.get_object(pk)
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class StudentImageList(APIView):
    """
    List all snippets, or create a new snippet.
    """
    def get(self, request, format=None):
        images = StudentImage.objects.all()
        serializer = StudentImageSerializer(images, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = StudentImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StudentImageDetail(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    def get_object(self, pk):
        try:
            return StudentImage.objects.get(pk=pk)
        except StudentImage.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        image = StudentImage.objects.filter(student_id=pk)        
        serializer = StudentImageSerializer(image,many=True)
        return Response(serializer.data)




    def put(self, request, pk, format=None):
        image = self.get_object(pk)
        serializer = StudentImageSerializer(image, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        image = self.get_object(pk)
        image.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class StudentAddressList(APIView):
    """
    List all snippets, or create a new snippet.
    """
    def get(self, request, format=None):
        addresses = StudentAddress.objects.all()
        serializer = StudentAddressSerializer(addresses, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = StudentAddressSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StudentAddressDetail(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    # def get_object(self, pk):
    #     try:
    #         return StudentAddress.objects.get(pk=pk)
    #     except StudentAddress.DoesNotExist:
    #         raise Http404

    # def get(self, request, pk, format=None):
    #     address = self.get_object(pk)
    #     serializer = StudentAddressSerializer(address)
    #     return Response(serializer.data)

    def get_object(self, pk):
        try:
            return StudentAddress.objects.get(pk=pk)
        except StudentAddress.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):

        # address = self.get_object(pk)
        address = StudentAddress.objects.filter(student_id=pk)
        serializer = StudentAddressSerializer(address,many=True)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        address = self.get_object(pk)
        
        # address = StudentAddress.objects.get(pk=pk)
        serializer = StudentAddressSerializer(address, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        address = self.get_object(pk)
        # address = StudentAddress.objects.get(pk=pk)
        address.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class StudentContactList(APIView):
    """
    List all snippets, or create a new snippet.
    """
    def get(self, request, format=None):
        contacts = StudentContact.objects.all()
        serializer = StudentContactSerializer(contacts, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = StudentContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StudentContactDetail(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    def get_object(self, pk):
        try:
            return StudentContact.objects.get(pk=pk)
        except StudentContact.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        
        # contact = self.get_object(pk)
        contact = StudentContact.objects.filter(student_id=pk)
        serializer = StudentContactSerializer(contact, many=True)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        contact = self.get_object(pk)
        # contact = StudentAddress.objects.get(pk=pk)
        serializer = StudentContactSerializer(contact, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        contact = self.get_object(pk)
        
        # contact = StudentAddress.objects.get(pk=pk)
        contact.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class StudentParentList(APIView):
    """
    List all snippets, or create a new snippet.
    """
    def get(self, request, format=None):
        parents = StudentParent.objects.all()
        serializer = StudentParentSerializer(parents, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = StudentParentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StudentParentDetail(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    def get_object(self, pk):
        try:
            return StudentParent.objects.get(pk=pk)
        except StudentParent.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        
        # parent = self.get_object(pk)
        parent = StudentParent.objects.filter(student_id=pk)
        serializer = StudentParentSerializer(parent,many=True)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        parent = self.get_object(pk)
        serializer = StudentParentSerializer(parent, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        parent = self.get_object(pk)
        parent.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
