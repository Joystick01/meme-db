<script>
    import { storage, db } from "./firebase"
    import Resizer from "react-image-file-resizer"; 

    let title
    let tags
    let file

    function resizeFile(file) {
        console.log(file)
        return new Promise(resolve => {
            Resizer.imageFileResizer(file, 1920, 1920, 'JPEG', 80, 0,
                uri => {
                    resolve(uri);
                },
                'blob'
            );
        });
    }

    function hashCode(s) {
        return s.split("").reduce(function (a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0)
    }

    async function handleFireBaseUpload(e){
        e.preventDefault()
        console.log("uploadTrigger")
        const name = hashCode(Date.now().toString()) + ".jpg";
        console.log('start of upload')

        const uploadTask = storage.ref(`/images/${name}`).put(await resizeFile(file[0]))

        uploadTask.on('state_changed',

            (snapShot) => {
                console.log(snapShot)
            }, 
            
            (err) => {
                console.log(err)
            }, 
            
            () => {
                storage.ref('images').child(name).getDownloadURL()
                    .then(fireBaseUrl => {
                        sendTemplate(fireBaseUrl)
                    })
                    //document.getElementById("uploadForm").reset();
            })
    }

    async function sendTemplate(url) {
        const upload = {
            id: Date.now(),
            image: url,
            title: title,
            tags: tags.split(",")
        }

        await db.collection('templates').add(upload)
        .then(async (documentReference) => {
        })
        .catch(error => {
            console.log(error.message)
        })

    }
</script>

<form on:submit={handleFireBaseUpload} id="uploadForm">
    <label>
        Titel
        <input type="text" name="title" bind:value={title}/>
    </label>
    <input type="file" bind:files={file}/>
    <label>
        Tags
        <input type="text" bind:value={tags} name="tags"/>
    </label>
    <button>Galvanise!</button>
</form>