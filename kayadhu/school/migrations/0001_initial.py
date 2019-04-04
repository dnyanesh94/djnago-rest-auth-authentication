# Generated by Django 2.1.4 on 2018-12-10 10:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('location_name', models.CharField(max_length=50)),
                ('address_1', models.CharField(max_length=50)),
                ('address_2', models.CharField(blank=True, max_length=50)),
                ('city', models.CharField(max_length=50)),
                ('state', models.CharField(max_length=4)),
                ('postal_code', models.CharField(max_length=10)),
                ('country', models.CharField(max_length=2)),
            ],
        ),
        migrations.CreateModel(
            name='School',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('school_name', models.CharField(max_length=30)),
                ('school_type', models.CharField(max_length=30)),
                ('school_description', models.TextField()),
            ],
        ),
        migrations.AddField(
            model_name='location',
            name='school',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='locations', to='school.School'),
        ),
    ]