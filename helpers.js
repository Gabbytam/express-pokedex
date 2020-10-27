//created a js file with a function for capitalizing first letter of a word(name)

function capitalize(name) {
    name= name.replace(name[0], name[0].toUpperCase());
    return name;
}

//export the function
module.exports= {capitalize};

