# Layouts
1. LinearLayout
```
  - android:layout_width/height
```
    1. match_parent : 화면 크기에 맞춤
    2. wrap_content : 컨텐츠 크기에 맞춰 유동적으로 변함

```
  - android:orientation
```
    1. vertical : 세로정렬
    2. hrizontal : 가로정렬

# Button
```
- android:layout_width/height
```
  1. match_parent : 화면 크기에 맞춤
  2. wrap_content : 컨텐츠 크기에 맞춰 유동적으로 변함
  3. ~~dp : ~~dp를 크기로 지정

```
- android:id="@+id/XXXX"  
```
  XXXX가 해당 컴포넌트의 id가 되어 이벤트를 적용할 때 불러올 수 있게 됨

```
- android:text="XXXX"  
```
  XXXX가 해당 컴포넌트의 내용이 됨

```
- android:textSize="XXdp"  
```
  컴포넌트 텍스트의 크기를 XXdp로 지정

```
- android:onClick="EventName"  
```
  java파일의 EventName메소드가 해당 컨텐츠의 이벤트 메소드가 됨(버튼을 눌렀을 때)

# TextView
```
-android:layout_width- android:layout_width/height
```
  1. match_parent : 화면 크기에 맞춤  
  2. wrap_content : 컨텐츠 크기에 맞춰 유동적으로 변함   
  3. ~~dp : ~~dp를 크기로 지정

```
- android:id="@+id/XXXX"  
```
  XXXX가 해당 컴포넌트의 id가 되어 이벤트를 적용할 때 불러올 수 있게 됨

```
- android:text="XXXX"  
```
  XXXX가 해당 컴포넌트의 내용이 됨

```
- android:textSize="XXdp"  
```
  컴포넌트 텍스트의 크기를 XXdp로 지정

```
- android:hint="XXXX"  
```
  XXXX가 해당 컴포넌트의 hint값이 됨(흐릿하게 입력전에만 보이는 값)

# TIP.
- 두 줄 사이의 간격을 만드는방법  
```xml
    <LinearLayout  
        android:layout_width="match_parent"  
        android:layout_height="XXdp">
    </LinearLayout>
```
  세로로 XXdp만큼의 간격을 생성함   
