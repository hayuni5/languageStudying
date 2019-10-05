def f(x=2):
    return x ** x


# 필수매개변수와 옵션매개변수 모두 필요한 함수


def addIt(x, y=10):
    return x + y


print(f())
print(f(4))
print(addIt(5))  # 콘솔에 15가 출력됨
