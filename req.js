let axios = require("axios")
let fs = require("fs")
let readlineSync = require("readline-sync")

async function get_data() {
    let response = await axios("http://saral.navgurukul.org/api/courses")

    const a = await response.data['availableCourses']

    fs.writeFile("saral_course.json", JSON.stringify(a, null, 4), function (err) {
        if (err) {
            console.log(err)
        }
    })
    count = 1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    for (i in a) {
        course_name = a[i]["name"]
        course_id = a[i]["id"]
        console.log(count, course_name, course_id);
        count += 1
    }

    serial_no = readlineSync.questionInt("enter serial number")
    user_id = a[serial_no - 1]["id"]
    console.log(user_id);

    let response1 = await axios("https://saral.navgurukul.org/api/courses/" + String(user_id) + "/exercises")

    const b = await response1.data['data']
    

    fs.writeFile("exercise.json", JSON.stringify(b, null, 4), function (err) {
        if (err) {
            console.log(err)
        }
    })
    for (j in b) {
        console.log(j,b[j]["name"])
        child = b[j]["childExercises"]
        var store=JSON.stringify(child)
        slug = b[j]["slug"]
        if (store=="[]" ) {
            console.log("  ", slug);
        }
        else {
            k = 0
            for (l in child) {
                console.log("  ",k+1, child[l]["name"])
                k += 1
            }
        }
    }

    let parent_id=readlineSync.questionInt("enter parent number")
    console.log(b[parent_id]["name"]);
    slug = b[parent_id]["slug"]
    store1=b[parent_id]["childExercises"]
    let store2=JSON.stringify(store1)

    if (store2=="[]"){
        console.log(slug);
        response2=await axios("https://saral.navgurukul.org/api/courses/"+String(user_id)+"/exercise/getBySlug?slug="+b[parent_id]["slug"])
        const c= await response2.data['content']

        
        fs.writeFile("slug_id.json",JSON.stringify(response2.data,null,4),function(err){
            if(err){
                console.log(err)
            }
            slug_input=readlineSync.question("Do you want slug")

            if(slug_input=="yes"){
                console.log(c);
            }
        })
    }
    else{
        m=1
        for(n in b[parent_id]["childExercises"] ){
            console.log(m+1,b[parent_id]["childExercises"][n]["name"]);
            m+=1
        }
        child_input=readlineSync.questionInt("enter child number")
        response3=await axios("https://saral.navgurukul.org/api/courses/"+String(user_id)+"/exercise/getBySlug?slug="+b[parent_id]["childExercises"][child_input-1]["slug"])
        
        const d=await response3.data["content"]
        
        fs.writeFile("child_id.json",JSON.stringify(response3.data,null,4),function(err){
            if(err){
                conso9le.log(err)
            }
        })
        console.log(d);
    }
}
a = (get_data());


