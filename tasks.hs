import Data.Char

lenVec3 x y z = sqrt (x ^ 2 + y ^ 2 + z ^ 2)
print $ lenVec3 2 3 6

infixl 6 |-|
(|-|) a b = abs (a - b)
print $ 5 |-| 7

twoDigits2Int :: Char -> Char -> Int
twoDigits2Int x y = if isDigit x && isDigit y then digitToInt x * 10 +  digitToInt y else 100
print $ twoDigits2Int '4' '2'

dist :: (Double, Double) -> (Double, Double) -> Double
dist p1 p2 = sqrt $ (fst p2 - fst p1) ^ 2 + (snd p2 - snd p1) ^ 2
print $ dist (0,0) (2,2)

doubleFact :: Integer -> Integer
doubleFact n = if n <= 0 then 1 else n * doubleFact (n - 2)
print $ doubleFact 7

fibonacci n
  | n == -1 = 1
  | n == -2 = -1
  | n == 0 = 0
  | n == 1 = 1
  | n < 0 = fibonacci (n + 2) - fibonacci (n + 1)
  | n > 0 = fibonacci (n - 1) + fibonacci (n - 2)
  | otherwise = error "something went wrong"

print $ fibonacci (-10)

fibonacci = helper 0 1
  where
    helper curr prev n
      | n == 0 = curr
      | n > 0 = helper (curr + prev) curr (n - 1)
      | n < 0 = helper prev (curr - prev) (n + 1)

print $ fibonacci (-10)

seqA :: Integer -> Integer
seqA 0 = 1
seqA 1 = 2
seqA 2 = 3
seqA n = s' 3 3 2 1 n

s' :: Integer -> Integer -> Integer -> Integer -> Integer -> Integer
s' i a b c n
  | (i < n) = s' (i + 1) res a b n
  | (i == n) = res
  where
    res = a + b - 2 * c

print $ seqA 2

mergeLists :: [Integer] -> [Integer] -> [Integer]
mergeLists lst1 lst2 = [ x | x <- lst1, x `elem` lst2]

print $ mergeLists [0,1,2] [4,5]

p1 = ((1,2), (3,4))
p2 = ((3,4), (5,6))

print $ (\(x, y) (x2, y2) -> x + y + x2 + y2) (fst p1) (fst p2)

sum3squares = (\x y z -> x+y+z) `on3` (^2)
on3 op f x y z = op (f x) (f y) (f z)
