An interface type is defined as a set of method signatures.

A value of interface type can hold any value that implements those methods.

```go
// interface
type geometry interface {
	area() float64
	perimeter float64
}

// example
type rect struct {
	width, height float64
}

// method
func (r rect) area() float64 {
	return r.width * r.height
}

// rect now has an area() method
// usage
func main() {
	r := rect{width: 3, height: 4}
	fmt.Println("rectangle area:", a.area())
}
```





