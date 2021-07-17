const createElemet = (ele) => document.createElement(ele)
const addAttributes = (elem, attrib) => {
    for (let k in attrib) {
        elem.setAttribute(k, attrib[k])

    }
}
var br = document.createElement("br");


function printAllVals(obj, el) {
    for (let k in obj) {
        if (typeof obj[k] === "object") {
            if (isNaN(k)) {
                $el = createElemet(k)
                if (el == undefined) {
                    el = $el
                } else {
                    el.appendChild($el)
                    el.appendChild(br.cloneNode());
                }
                return printAllVals(obj[k], $el)

            } else {

                printAllVals(obj[k], el)
            }


        } else if (isNaN(k)) {
            addAttributes(el, obj)

        }
    }
    return el;
}

var object = {
        form: [{
                "input": {
                    name: "user name",
                    id: "name1",
                    type: "input",
                    placeholder: "usernameaa",
                    class: "form-control"

                }
            },
            {
                "input": {
                    id: "button",
                    type: "button",
                    value: "submit",
                    class: "btn btn-primary form-control"

                }
            },
            {
                input: {
                    name: "user name",
                    id: "name",
                    type: "input",
                    placeholder: "usernamea",
                    class: "form-control"

                }
            }
        ]

    }
    // traverse(object)
var elemt = printAllVals(object)
    // var elemt = traverse(object, function(k, v) {
    //     console.log(k + " : " + v);
    // });

// var tem = console.log(elemt)

var field = document.getElementById("1");
// console.log(fie ld)
// var tojson = JSON.parse(object);
field.innerHTML = JSON.stringify(object);

// cons
// console.log(tem)
var field1 = document.getElementById("exampleFormControlTextarea2");
// var tojson = JSON.parse(field.value);
field1.innerText = elemt.outerHTML;

document.getElementsByTagName("body")[0]
    .appendChild(elemt);




var $form = createElemet('form');

var $input = createElemet('input');
var attrib = {
    name: "user name",
    id: "name1",
    type: "input",
    placeholder: "usernameaa"

}

addAttributes($input, attrib)
    // console.log($input)