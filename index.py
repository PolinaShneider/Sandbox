# num = int(input('Введи число: '))
# pow = int(input('Введи его степень: '))
# result = 1
# for x in range(pow):
#     result *= num
#
# print(result)

# num = int(input('Введи число: '))
# result = 1
# for x in range(1, num + 1):
#     result *= x
#
# print(result)

# num = int(input('Введи число: '))
# for x in range(1, num + 1):
#     print(x * x)

# num = int(input('Введи число: '))
# a = 0
# b = 1
# for i in range(0, num):
#     print(a)
#     temp = a
#     a = b
#     b = temp + b

# num = int(input('Введи число: '))
# a = 0
# b = 1
# temp = 0
# for i in range(0, num):
#     temp = a
#     result = a
#     a = b
#     b = temp + b
#
# print(temp)

# for i in range(1, 10):
#     temp = ''
#     for j in range(1, 10):
#         temp += ' |' + str(i * j) + '| '
#     print(temp)

# letter = input('Введите букву: ')
# num = int(input('Введите цифру: '))
#
# if letter == 'A' or letter == 'C' or letter == 'E' or letter == 'G':
#     if num % 2 == 0:
#         print('WHITE')
#     else:
#         print('BLACK')
# elif letter == 'B' or letter == 'DC' or letter == 'F' or letter == 'H':
#     if num % 2 == 0:
#         print('BLACK')
#     else:
#         print('WHITE')

# first = int(input('Зарплата первого: '))
# second = int(input('Зарплата второго: '))
# third = int(input('Зарплата третьего: '))
#
# max = 0
# min = 0
# mid = 0
#
# if first > second:
#     max = first
#     min = second
# else:
#     max = second
#     min = first
#
# if (third >= max):
#     mid = max
#     max = third
# elif third < min:
#     mid = min
#     min = third
#
# print("max: " + str(max) + " mid: " + str(mid) + " min: " + str(min))
# print("diff: " + str(max - min))

# a = int(input('Введите a: '))
# # b = int(input('Введите b: '))
# # c = int(input('Введите c: '))
# #
# # max = 0
# # min = 0
# # mid = 0
# #
# # if a > b:
# #     max = a
# #     min = b
# # else:
# #     max = b
# #     min = a
# #
# # if (c >= max):
# #     mid = max
# #     max = c
# # elif c < min:
# #     mid = min
# #     min = c
# #
# # if min + mid == max:
# #     print("YES")
# # else:
# #     print("NO")

# num = int(input('Введите число: '))
#
# if num // 1000 > 0:
#     print(4)
# elif num // 100 > 0:
#     print(3)
# elif num // 10 > 0:
#     print(2)
# else:
#     print(1)

# password = input("Введи пароль ")
# while password != "пока" and password != "выход":
#     password = input("Введи пароль ")
#
# if password == "пока":
#     print("все верно")
# else:
#     print("ты устал пытаться")

# sum = 0
# count = 0
# num = int(input("введите число "))
#
# while num != 0:
#     num = int(input("введите число "))
#     count += 1
#     sum += num
#
# if count > 0:
#     print(sum / count)
# else:
#     print("вы не ввели ни одного числа, ужс")

# num = int(input("Введите число "))
# count = 0
# while num > 0:
#     num //= 10
#     count += 1
#
# print(count)

# num = int(input("Введите число "))
# sum = 0
# while num > 0:
#     sum += num % 10
#     num //= 10
#
# print(sum)

# import random
# target = random.randint(0, 99)
# print(target)
# attempt = int(input("введите число "))
# while attempt != target:
#     if attempt < target:
#         print("больше ")
#
#     if attempt > target:
#         print("меньше ")
#
#     attempt = int(input("введите число "))
#
# print("вы угадали число")
# import random
#
# first = 100
# second = 100
#
# while first >= 0 or second >= 0:
#     first_xp = random.randint(1, 10)
#     first -= first_xp
#     print("у первого отняли " + str(first_xp) + " осталось " + str(first))
#
#     second_xp = random.randint(1, 10)
#     second -= second_xp
#     print("у второго отняли " + str(second_xp) + " осталось " + str(second))
#
# if (first > second):
#     print("победил первый")
# else:
#     print("победил второй")


# def max(a, b):
#     if a > b:
#         return a
#     else:
#         return b
#
#
# print(max(15, 8))

# def average(a, b):
#     return (a + b) / 2
#
#
# print(average(5, 6))

# def max_three(a, b, c):
#     max = a
#     if b > max:
#         max = b
#
#     if c > max:
#         max = c
#
#     return max
#
#
# print(max_three(3, 4, 1))

# def to_binary(x):
#     result = ""
#
#     while x > 0:
#         result = str(x % 2) + result
#         x //= 2
#
#     return result
#
#
# print(to_binary(25))

# arr = [1, 6, 8, 3, -9, 19, 7]
# for i in range(len(arr)):
#     for j in range(len(arr) - 1):
#         if arr[j] > arr[j + 1]:
#             tmp = arr[j + 1]
#             arr[j + 1] = arr[j]
#             arr[j] = tmp

# print(arr)

# arr = [3, 9, 8, 4, 5, 1]
# for i in range(1, len(arr)):
#     if arr[i] > arr[i - 1]:
#         print(arr[i])

# arr = [-4, 2, -5, 4, -6]
# searching = True
# i = 0
# while i < len(arr) and searching:
#     if arr[i] > 0:
#         print(arr[i])
#         searching = False
#     i += 1
#
# if searching:
#     print("No positive elements, Uzhos")

# sum = 0
# prod = 1
# arr = [1, 3, 4, 5, -3, -2]
#
# for i in range(len(arr)):
#     sum += arr[i]
#     prod *= arr[i]
#
# print(sum)
# print(prod)

# arr = [2, 4, 5, 66, 14, 56, 17, 12, 60]
# for i in range(len(arr) - 1, -1, -1):
#     if arr[i] < 12:
#         del arr[i]
#
# print(arr)

# arr = [2, 5, 3, 4, 6, 2, 22, 21]
# max = -1000
#
# for i in range(len(arr)):
#     if arr[i] > max:
#         max = arr[i]
#
# print(max)
