"use strict";
class Stack {

    ds
    counter

    constructor() {
        this.ds = []
        this.counter = -1
    }

    push(elem) {
        this.counter++
        this.ds[this.counter] = new Number(elem)
    }


    get(index) {
        if(index <= this.counter)
            return new Number(this.ds[index])
    }

    getSize() {
        return this.counter + 1
    }

    reset() {
        this.ds = []
        this.counter = -1
    }
}

class CalculadoraRPN {
    
    stack
    pantalla
    entrada
    shft

    constructor() {
        this.stack = new Stack()
        this.pantalla = ""
        this.entrada = "0"
        this.shft = false
    }

    paintScreen() {
        var i = 0
        this.pantalla = ""
        while (i < this.stack.getSize()) {
            this.pantalla += this.stack.get(i) + "\n"
            i++
        }
        document.getElementsByTagName("textarea")[0].textContent = this.pantalla
    }

    digitos(n) {
        if(this.entrada == "0")        
            this.entrada = n
        else                           
            this.entrada += "" + n

        document.getElementsByTagName("input")[0].value = this.entrada
    }

    punto() {
        if(! this.haveDot(this.entrada))
            this.entrada += "."
            document.getElementsByTagName("input")[0].value = this.entrada
    }

    haveDot(n) {
        var separated = (n + "").split(".")
        if(separated[1] == null) return false;
        return true;
    }

    shift() {
        this.shft = !this.shft
        if(this.shft){
            document.getElementsByTagName("input")[30].value = "↑*"
            document.getElementsByTagName("input")[30].value = "↑"
            document.querySelector('input[value="cos"]').value = "acos";
            document.querySelector('input[value="sin"]').value = "asin";
            document.querySelector('input[value="tan"]').value = "atan";
        }  
        else{
            document.getElementsByTagName("input")[30].value = "↑"
            document.querySelector('input[value="acos"]').value = "cos";
            document.querySelector('input[value="asin"]').value = "sin";
            document.querySelector('input[value="atan"]').value = "tan";
        }
    }

    enter() {
        var operand = document.getElementsByTagName("input")[0].value

        this.entrada = "0"
        document.getElementsByTagName("input")[0]. value = this.entrada

        this.stack.push(new Number(operand))
        this.paintScreen()
    }

    suma() { this.binaryOperation("+") }

    resta() { this.binaryOperation("-") }

    multiplicacion() { this.binaryOperation("x") }

    division() { this.binaryOperation("÷") }

    potencia() { this.binaryOperation("^") }

    modulo() { this.binaryOperation("%") }

    binaryOperation(op) {
        if(this.stack.getSize() >= 2) {
            var op2 = new Number(this.stack.pop())
            var op1 = new Number(this.stack.pop())
            var res;

            if(op == "+") res = op1 + op2
            else if(op == "-") res = op1 - op2
            else if(op == "x") res = op1 * op2
            else if(op == "÷") res = op1 / op2
            else if(op == "^") res = op1 ** op2
            else if(op == "%") res = op1 % op2

            if(isNaN(res)) { this.stack.push(new Number(op1)) ; res = op2 }

            this.stack.push(new Number(res))
            this.paintScreen()
        }
    }

    e() {
        this.entrada = Math.E
        document.getElementsByTagName("input")[0].value = this.entrada
    }

    masMenos() {
        this.entrada = new Number(this.entrada) * new Number(-1)
        document.getElementsByTagName("input")[0].value = this.entrada
    }

    borrarNumero() {
        this.entrada = "0"
        document.getElementsByTagName("input")[0].value = this.entrada
    }

    borrar() {
        this.stack.reset()
        this.pantalla = ""
        this.entrada = "0"
        document.getElementsByTagName("textarea")[0].textContent = this.pantalla
        document.getElementsByTagName("input")[0].value = this.entrada
    }

    borrarUltimo() {
        this.stack.pop()
        this.paintScreen()
    }

    factorial(n) {
        if(n == 0 || n == 1) return new Number(1);
        else try { return new Number(n) * this.factorial(n-1) } catch(err) { alert("(X) Error: " + err) }
    }

    fact() { this.opUnaria("fact") }

    potencia2() { this.opUnaria("pot2") }

    raiz() { this.opUnaria("raiz") }

    sinArc() { this.opUnaria("sinArc") }

    cosArc() { this.opUnaria("cosArc") }

    tanArc() { this.opUnaria("tanArc") }

    opUnaria(op) {
        if(this.stack.getSize() > 0) {
            var op1 = new Number(this.stack.pop())
            var res;

            if(op == "fact") res =  this.factorial(op1)
            else if(op == "pot2") res = Math.pow(op1, new Number(2))
            else if(op == "raiz") res = Math.sqrt(op1)
            else if(op == "sinArc") res = this.shft ? Math.asin(op1) : Math.sin(op1)
            else if(op == "cosArc") res = this.shft ? Math.acos(op1) : Math.cos(op1)
            else if(op == "tanArc") res = this.shft ? Math.atan(op1) : Math.tan(op1)

            if(res == 1.2246467991473532e-16) res = 0

            if(isNaN(res)) res = op1

            this.stack.push(new Number(res))
            this.paintScreen()
        }
    }

    receiveKeyPressed(e) {
        if (e.key == "Escape") this.borrar();
        else if(e.key == "1") this.digitos(1);
        else if(e.key == "2") this.digitos(2);
        else if(e.key == "3") this.digitos(3);
        else if(e.key == "4") this.digitos(4);
        else if(e.key == "5") this.digitos(5);
        else if(e.key == "6") this.digitos(6);
        else if(e.key == "7") this.digitos(7);
        else if(e.key == "8") this.digitos(8);
        else if(e.key == "9") this.digitos(9);
        else if(e.key == "0") this.digitos(0);
        else if(e.key == ".") this.punto();
        else if(e.key == "+") this.suma();
        else if(e.key == "-") this.resta();
        else if(e.key == "*") this.multiplicacion();
        else if(e.key == "/") this.division();
        else if(e.key == "Control") this.shift();
        else if(e.key == "c" || e.key == "C") this.borrarNumero();
        else if(e.key == "s" || e.key == "S") this.masMenos();
        else if(e.key == "e" || e.key == "E") this.e();
        else if(e.key == "Enter") { this.enter(); e.preventDefault() }
        else if(e.key == "r" || e.key == "R") this.raiz();
        else if(e.key == "!") this.fact();
        else if(e.key == "\"") this.potencia2();
        else if(e.key == "\'") this.potencia();
        else if(e.key == "m" || e.key == "M") this.modulo();
        else if(e.key == "i" || e.key == "I") this.sinArc();
        else if(e.key == "o" || e.key == "O") this.cosArc();
        else if(e.key == "a" || e.key == "A") this.tanArc();
    }

}

var CALC = new CalculadoraRPN();

document.addEventListener('keydown', (e) => CALC.receiveKeyPressed(e));
