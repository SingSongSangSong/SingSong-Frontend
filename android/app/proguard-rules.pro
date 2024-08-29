# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:
# Keep all classes from the 'com.example' package
-keep class com.example.** { *; }

# Keep specific methods or classes that might be removed by ProGuard
-keepclassmembers class * {
    public <init>(...);
    public static ** main(...);
}

# Keep Firebase and other SDKs
-keep class com.google.firebase.** { *; }
-keep class com.facebook.** { *; }
-keepattributes Signature
-keepattributes *Annotation*

# Keep enums
-keepclassmembers enum * {
    public static **[] values();
    public static ** valueOf(java.lang.String);
}

# Keep native methods
-keepclasseswithmembernames class * {
    native <methods>;
}

# Keep React Native classes
-keep class com.facebook.react.** { *; }
-keep class com.facebook.jni.** { *; }
-keep @com.facebook.proguard.annotations.DoNotStrip class *
-keepclassmembers class * {
    @com.facebook.proguard.annotations.DoNotStrip <fields>;
}

# Keep Glide classes (if used)
-keep public class * implements com.bumptech.glide.module.GlideModule
-keep public class * extends com.bumptech.glide.AppGlideModule
-keep public class * extends com.bumptech.glide.module.LibraryGlideModule
-keep public class * extends com.bumptech.glide.module.GlideModule
