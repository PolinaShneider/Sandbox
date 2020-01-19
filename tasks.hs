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

mergeLists :: [Integer] -> [Integer] -> [Integer]
mergeLists lst1 lst2 = [ x | x <- lst1, x `elem` lst2]

tokenize :: Integer -> [Integer]
tokenize n = helper n []
helper n accum
 | n > 0 = helper (n `div` 10) accum ++ [n `mod` 10]
 | otherwise = accum

sameDigits :: [Integer] -> Integer -> [Integer]
sameDigits arr value = [el | el <- arr, q <- tokenize el, q `elem` tokenize value]

countEvenOdds :: [Integer] -> (Integer, Integer)
countEvenOdds lst = (toInteger $ length $ filter even lst, toInteger $ length $ filter odd lst)

p1 = ((1,2), (3,4))
p2 = ((3,4), (5,6))

doItYourself = f . g . h
f = (max 42)
g = (^3)
h = (logBase 2)

accumulate :: [Int] -> [Int]
accumulate lst = helper' lst 0 0 []
helper' :: [Int] -> Int -> Int -> [Int] -> [Int]
helper' src index accum curr
  | index < length src = helper' src (index + 1) (accum + src !! index) (curr ++ [accum])
  | otherwise = curr

revert :: Int -> Int
revert n = helper'' n 0
helper'' n res
  | n > 0 = helper'' (n `div` 10) (res * 10 + n `mod` 10)
  | otherwise = res



factorize :: Int -> [Int]
--factorize n = helper''' n [] 1
--helper''' n acc index
--  | index <= n && n `mod` index == 0 = helper''' n (acc ++ [index]) (index + 1)
--  | index <= n && n `mod` index > 0 = helper''' n acc (index + 1)
--  | otherwise = acc

factorize n = [elem | elem <- [1..n], n `mod` elem == 0]

mostFrequent :: [Int] -> Int
mostFrequent arr = helper4 arr (head arr) 0
helper4 arr max' index
  | index < length arr = helper4 arr (decide arr (arr !! index) max') (index + 1)
  | otherwise = max'

getFrequency arr elem = length [x | x <- arr, x == elem]
decide arr elem max' = if getFrequency arr elem > getFrequency arr max' then elem else max'

replace :: [Int] -> Int -> Int -> [Int]
replace arr m n = [if el == m then n else el | el <- arr]

duplicateIndex :: [Int] -> Int
duplicateIndex lst = helper5 lst 0 1
helper5 lst prev curr
  | curr >= length lst = -1
  | lst !! prev == lst !! curr = prev
  | otherwise = helper5 lst (prev + 1) (curr + 1)

intervalSum :: Int -> Int -> Int
intervalSum m n = sum [m .. n - 1]

center :: [Int] -> [Int]
center lst = [el - target lst | el <- lst]
target arr
  | null arr = 0
  | odd (length arr) = arr !! (length arr `div` 2)
  | otherwise = (arr !! (length arr `div` 2) + arr !! ((length arr `div` 2) - 1)) `div` 2

avg :: Int -> Int -> Int -> Double
avg x y z = fromInteger (toInteger x + toInteger y + toInteger z) / 3

sortMerge :: [Int] -> [Int] -> [Int]
sortMerge [] [] = []
sortMerge xs [] = xs
sortMerge [] xs = xs
sortMerge (h:first) (c:second)
  | h <= c = h:sortMerge first (c:second)
  | h > c = c:sortMerge (h:first) second

sumOdd lst = sum [elem | elem <- lst, odd elem]
lastElem :: [Int] -> Int
lastElem = foldl1 (flip const)

partials = scanl1 (+)
main = print $ foldr (\x (e, o) -> if even x then (e + 1, o) else (e, o + 1)) (0, 0) [1, 2, 3, 4, 5, 7, 9]

fib 1 = 1
fib 2 = 1
fib n = fib (n - 1) + fib (n - 2)
--ownLast = foldl1 $ flip const
reverse' :: [Int] -> [Int]
reverse' = foldl (flip(:)) []

reverseStr :: String -> String
reverseStr = foldl (flip (:)) []

isPalyndrom :: String -> Bool
isPalyndrom str = str == reverseStr str

unique :: [Integer] -> [Integer]
unique = foldl (\seen x -> if x `elem` seen then seen else seen ++ [x]) []

sameDigits :: [Integer] -> Integer -> [Integer]
sameDigits arr value = unique [el | el <- arr, q <- digs el, q `elem` digs value]

digs :: Integral x => x -> [x]
digs 0 = []
digs x = digs (x `div` 10) ++ [x `mod` 10]

data Change = Plus | Minus | Equals deriving Show
data MagicNumber = MagicNumber Change Int deriving Show


magic :: [Int] -> [MagicNumber]
magic lst = magicHelper lst 0 1 []
magicHelper lst prev curr acc
  | curr >= length lst = acc
  | current > previous = magicHelper lst (prev + 1) (curr + 1) (acc ++ [MagicNumber Minus (current - previous)])
  | current == previous = magicHelper lst (prev + 1) (curr + 1) (acc ++ [MagicNumber Equals previous])
  | otherwise =  magicHelper lst (prev + 1) (curr + 1) (acc ++ [MagicNumber Minus (current - previous)])
  where
    current = lst !! curr
    previous = lst !! prev

main = print $ magic [-1,-1,72,4,5,-6,-7,7]
