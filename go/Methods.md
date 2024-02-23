Go does not have classes. However, you can define methods on types.

A method is a function with a special receiver argument.

```go
// type
type Vertex struct {
	x, y float64
}

// method
func (v Vertex) Abs() float64 {
	return math.Sqrt(v.x * v.x + v.y * v.y)
}

// usage
func main() {
	v := Vertex{3, 4}
	fmt.Println(v.Abs())
}
```

```go
// type
type User struct {
	first, last float64
}

// method
func (u User) Greeting() string {
	return fmt.Sprintf("My name is %s $s", u.first, u.last)
}

// usage
func main() {
	u := User{"Sean", "Velasco"}
	fmt.Println(u.Greeting())
}
```



