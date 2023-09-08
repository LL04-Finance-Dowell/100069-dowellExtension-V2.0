import { useQueries, useQuery } from "react-query";
import HeaderComponent from "../components/HeaderComponent";
import Logo from  "../assets/mdi_null-off.png"
import FetchService from "../lib/api/fetchService";
import TabButton from "../components/TabButton";
import { AiOutlineEye, AiOutlinePlus} from "react-icons/ai";


export default function CreditSystem (){
    const fields = ["Service Key","Credit","Status"]
    const { data } = useQuery("userInfo");

    const ServiceKeyField =({servicekey})=> {
        return (
            <div style={boxStyle}>
            <div className="rectangle" style={rectangleStyle}>
                <div style={apiKeyTextWrapperStyle}>                        
                    {servicekey} <AiOutlineEye size={15} color="lightgrey" />
                </div>
            </div>
        </div>
    );
    }
    const query = [
        {
          queryKey: ["creditData"],
          queryFn: async () =>
            await FetchService(data?.data.userinfo.client_admin_id),
        }]
        const [
            creditDataQuery,

          ] = useQueries(query);
        
          if (
            creditDataQuery.isLoading 
          ) {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                  width: "100px",
                  marginLeft:50,
                  fontSize: 20,
                }}
              >
                Loading...
              </div>
            );
          }
        
      
    return (
        <div>
        <div style={{marginLeft : 15}}>
            <HeaderComponent title="CREDITS SYSTEM" />
        </div>
        <TabButton description={"Buy Credits"}/>

        {creditDataQuery?.data.data.success === true ? (
        <div>
            <div style={{height:"90vh", marginTop:100, marginLeft:30}}>
    
                {Object.entries(fields).map(([key,value])=>
                    <div style={{height:70}}>
                    <h3 style={{marginBottom:5,fontSize:17, fontWeight:"normal" ,height:25}}>{value}:</h3>
                    {value === "Service Key"
                                    ? (<ServiceKeyField servicekey={creditDataQuery?.data?.data?.data?.api_key}/>)
                                    :(
                    <div style={boxStyle}>
                        <div className="rectangle" style={rectangleStyle}>
                            <div style={textWrapperStyle}>                        
                                {value === "Credit"
                                        ? (creditDataQuery?.data?.data?.data?.total_credits)
                                        : value === "Status"
                                        ? (creditDataQuery?.data?.data?.data?.is_active? "Active":"Inactive")
                                        :null}
                            </div>
                        </div>
                    </div>)}

                    </div>
                )

                }
                </div>
            
        </div>):(
        <div style={{ marginTop:150, display:"flex", flexDirection:"column"}}>
                <img src={Logo} style={{width:100,marginLeft:140}}/>
                <p style={{marginLeft:57, color:"#D5D4D4"}}>You have not created a service key</p>
        </div>
        )}

        </div>
    );
}

const dataFieldStyle = {
    width:"260px",
    height:"35px",
    fontSize:"13px",
    marginBottom:"70px",
    marginTop:"5px",
    backgroundColor:"#ffffff",
    padding:"8px 0px 0px 15px",
    borderRadius:"100px",
    boxShadow:"3px 3px 7px 0px #9C9C9C7A inset",  
    fontWeight:"normal"  
  }

  const boxStyle = {
    height: "37px",
    width: "310px",
    marginTop: "0px",
    marginRight: "10px",
    marginLeft: "0px",
  };
  
  const rectangleStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "100px",
    boxShadow:"3px 3px 7px 0px #9C9C9C7A inset",  
    height: "37px",
    width: "310px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  };
  
  const textWrapperStyle = {
    color: "#000000",
    fontSize: "13px",
    fontWeight: 300,
    height: "15px",
    letterSpacing: "0",
    lineHeight: "normal",
    marginRight: "auto",
    marginLeft: "20px",
  };
  

  const apiKeyTextWrapperStyle = {
    color: "#000000",
    width:"90%",
    fontSize: "13px",
    fontWeight: 300,
    height: "15px",
    // letterSpacing: "0",
    lineHeight: "normal",
    marginRight: "auto",
    marginLeft: "20px",
  };
  