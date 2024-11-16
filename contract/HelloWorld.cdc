pub contract HelloWorld {

    pub var greeting: String

    pub fun setGreeting(newGreeting: String) {
        greeting = newGreeting
    }

    pub fun getGreeting(): String {
        return greeting
    }

    init() {
        greeting = "Hello, Flow!"
    }
}
