console.log(this); // 전역 스코프의 this가 브라우저와 달리 global이 아닌 빈 객체 {}이다

function a() {
    console.log(this === global);
}
a();
