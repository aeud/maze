import Prelude
import Debug.Trace
import qualified Data.Sequence as S
import System.IO

data Wall = Wall Int Int deriving (Show) -- Index, Direction
data Maze = Maze Int Int [Wall] (S.Seq Bool) deriving (Show) -- Dimension, Size, [Walls], Grid

getWalls :: Maze -> [Wall]
getWalls (Maze d n ws ss) = ws

pushWall :: Maze -> Wall -> Maze
pushWall (Maze d n ws ss) w = Maze d n (w:ws) ss

dig :: Maze -> Maze
dig (Maze _ _ [] _) = error "Test"
dig (Maze d n (w:ws) s) = m'
	where
		m = Maze d n ws s
		m' = 
			if diggable m w
				then digDirection m w
				else m

diggable :: Maze -> Wall -> Bool
diggable (Maze d n ws s) (Wall index direction) =
	if quot index (n * (abs direction)) == quot (index - direction) (n * (abs direction))
		then not (S.index s index')
		else False
	where index' = index + direction

digDirection :: Maze -> Wall -> Maze
digDirection m (Wall index direction) = pushDirections m'' index'
	where
		m' = white m index
		m'' = white m' index'
		index' = index + direction

pushDirections :: Maze -> Int -> Maze
pushDirections m index = pushDirection m index 1

pushDirection :: Maze -> Int -> Int -> Maze
pushDirection (Maze dimension size ws s) index direction =
	if direction > 0
		then pushDirection m index (- direction)
		else if (abs direction) > (size ^ dimension)
			then m
			else pushDirection m index (- direction * size)
	where 
		m' = Maze dimension size ws s
		m = 
			if (i >= 0) && (i < bound) && (diggable m' w')
				then pushWall m' w'
				else m' 
			where
				i = index + direction
				bound = size ^ dimension
				w' = Wall (index + direction) direction

white :: Maze -> Int -> Maze
white (Maze d n ws s) index = Maze d n ws s'
	where s' = S.update index True s 

initial :: Int -> Int -> Maze
initial d n = Maze d m w s
	where
		s = S.fromList (take (m ^ d) firstShot)
		m = 2 * n + 1
		firstShot = True : repeat(False)
		w = w1 : w2 : []
			where
				w1 = Wall 1 1
				w2 = Wall m m

recur :: Maze -> Maze
recur m =
	if length (getWalls m) > 0 
		then recur m'
		else m
		where
			m' = dig m

toString :: Maze -> [Char]
toString (Maze _ _ ws s) = show s
		  
m = recur (initial 2 150);
main = do
	writeFile "maze.txt" (toString m)   
     