export default function Formdata() {
    const [myImage, setMyImage] = useState()

    function postImage(e) {
        const formdata = new Formdata();
        formdata.append("image", myImage)
        axios.post("apiendpoints", formdata, {

        }).then((res) => {
            console.log(res?.data)
        }).catch((err) => console.log(err))
    }
    return <>
        <input type="file" accept="image/*" onChange={(e) => setMyImage(URL.createObjectURL(e.target.files[0]))} />
        {
            myImage && <img src={myImage} alt="" className="" />
        }
    </>
}