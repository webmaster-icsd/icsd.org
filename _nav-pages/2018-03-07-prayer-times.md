---
title: Prayer (Iqama) Times
layout: page-with-full-width-layout
fajr: '05:15 am'
dhuhr: '01:15 pm'
asr: '04:45 pm'
magrib: 5 mins after sunset
isha: '09:15 pm'
jumuah: '12:30 pm / 01:45pm'
published: true
---

<div id = 'prayer-times' class="row py-4 px-lg-3 pb-5">
    <div class="col-12">
        <div class="row pb-2">
            <div class="col-4 ">Fajr</div>
            <div class="col-8">{{page.fajr}}</div>
        </div>
        <div class="row py-2">
            <div class="col-4">Dhuhr</div>
            <div class="col-8">{{page.dhuhr}}</div>
        </div>
        <div class="row py-2">
            <div class="col-4">Asr</div>
            <div class="col-8">{{page.asr}}</div>
        </div>
        <div class="row py-2">
            <div class="col-4">Magrib</div>
            <div class="col-8">{{page.magrib}}</div>
        </div>
        <div class="row py-2">
            <div class="col-4">Isha</div>
            <div class="col-8">{{page.isha}}</div>
        </div>
        <div class="row pt-2">
            <div class="col-4">Jumu'ah</div>
            <div class="col-8">{{page.jumuah}}</div>
        </div>
    </div>
</div>

<div id = 'subscribe-form' class="row py-4 px-lg-3 ">
    <div class="col-12">
            <p> ** Please use below form to subscribe to notifications.</p>
    </div>
    {% include subscribe-widget.html %}
</div>
