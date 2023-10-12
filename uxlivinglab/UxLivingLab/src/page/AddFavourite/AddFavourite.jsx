import { useState } from "react";
import HeaderComponent from "../../components/HeaderComponent";
import DropdownComponent from "./Dropdown";
import styles from "./style.module.css";
import { FiLink2 } from "react-icons/fi";
import TabButton from "../../components/TabButton";
import { useMutation, useQuery } from "react-query";

import FetchUserInfo from "../../lib/api/fetchUserInfo";
import { getOrganisation } from "../../utils/getOrgs";
import ProductDropdown from "./ProductDropdown";
import useStore from "../../hooks/use-hook";
import PortfolioDropdown from "./PortfolioDropdown";
import { useNavigate } from "react-router";
import ImageModal from "../../components/ImageModal";
import SendFavourites from "../../lib/api/sendFavourite";
import UploadImages from "../../lib/api/uploadImages";
import { useStateContext } from "../../Contexts/Context";

export default function AddFavourite() {
  const navigate = useNavigate();
  const { sessionId } = useStateContext();

  const [image, setImage] = useState(null);
  const [org, setOrg] = useState(null);
  const [product, setProduct] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [open, setOpen] = useState(false);
  const [Uploading, setUploading] = useState();
  const [userInfo, setUserInfo] = useState();

  const products = useStore((state) => state.products);
  const setOrgs = useStore((state) => state.setOrgs);
  const orgs = useStore((state) => state.orgs);

  // console.log("orgs", orgs);

  const res = useQuery("fetchFav", async () => {
    const userInfo = await FetchUserInfo(sessionId);
    const other_org = userInfo.data.other_org || [];
    const own_org = userInfo.data.own_organisations || [];
    const updatedData = [...other_org, ...own_org];
    const orges = getOrganisation(updatedData);
    setUserInfo(userInfo.data.userinfo);
    setOrgs(orges);
    return updatedData;
  });

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: (data) => SendFavourites(data),
    onSuccess: () => navigate(-1),
    // onError: (err) => console.log("err", err),
  });

  if (isError) {
    console.log("s", error);
  }

  const handleSubmit = () => {
    if (!org || !product || !portfolio) {
      alert("Please select workspace, product, portfolio");
      return;
    }

    const data = {
      image_url: image ?? Uploading,
      action: true,
      username: userInfo?.username,
      product_name: product,
      portfolio,
      org_name: org.org_name,
      org_id: org.org_id,
      user_id: userInfo?.userID,
    };
    // console.log(data);
    mutate(data);
  };

  const handleImageUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const upload = await UploadImages(formData);
      if (upload.data.file_url) {
        setUploading(upload.data.file_url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        marginLeft: 15,
      }}
    >
      <HeaderComponent
        title={"Add Favourite"}
        navigation={() => navigate(-1)}
        type="add"
      />
      <div style={{ marginTop: 30, marginBottom: "auto" }}>
        <div>
          <span className={styles.spanStyle}>Select WorkSpace:</span>
          <DropdownComponent
            options={orgs || []}
            setOrg={setOrg}
            data={res.data}
            isLoading={isLoading}
          />
          {isError && (
            <span style={{ color: "red", marginTop: 3 }}>
              {error?.response?.data?.org_name}
            </span>
          )}
        </div>
        <div style={{ marginTop: 20 }}>
          <span className={styles.spanStyle}>Select Product:</span>
          <ProductDropdown
            options={products?.map((item) => item.product)}
            setProduct={setProduct}
            isLoading={isLoading}
          />
          {isError && (
            <span style={{ color: "red", marginTop: 3 }}>
              {error?.response?.data?.product_name}
            </span>
          )}
        </div>
        <div style={{ marginTop: 20 }}>
          <span className={styles.spanStyle}>Select Portfolio:</span>
          <PortfolioDropdown
            product={product}
            setPortfolio={setPortfolio}
            isLoading={isLoading}
          />
          {isError && (
            <span style={{ color: "red", marginTop: 3 }}>
              {error?.response?.data?.portfolio}
            </span>
          )}
        </div>
        <div
          style={{ marginTop: 20, display: "flex", flexDirection: "column" }}
        >
          <span className={styles.spanStyle}>
            Upload Image:
            {Uploading && (
              <span className={styles.placeholderClassName}>
                Uploaded successfully
              </span>
            )}
          </span>
          <input
            type="file"
            id="image"
            className={styles.inputStyle}
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files[0])}
            disabled={isLoading}
          />
          <div className={styles.labelStyle}>
            <label htmlFor="image" className={styles.label}>
              Choose
            </label>
            <FiLink2 size={12} className={styles.icon} />
          </div>
        </div>
        <div style={{ marginTop: 20 }} onClick={() => setOpen(true)}>
          <span className={styles.spanStyle}>
            Choose Images:{image && "1 file chosen"}
          </span>
          <div className={styles.select}>
            <label className={styles.label}>Choose</label>
            <FiLink2 size={12} className={styles.icon} />
          </div>
        </div>
        {
          <ImageModal
            open={open}
            handleClose={() => setOpen(false)}
            setImage={setImage}
            data={res.data}
            userInfo={userInfo}
          />
        }
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div
          style={{ marginTop: 15 }}
          onClick={handleSubmit}
          aria-disabled={isLoading}
        >
          <TabButton description={"Submit"} />
        </div>
      )}
    </div>
  );
}
