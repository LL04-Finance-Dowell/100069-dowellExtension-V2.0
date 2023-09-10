import { useEffect, useState } from "react";
import HeaderComponent from "../../components/HeaderComponent";
import DropdownComponent from "./Dropdown";
import styles from "./style.module.css";
import { FiLink2 } from "react-icons/fi";
import TabButton from "../../components/TabButton";
import { useMutation, useQuery } from "react-query";
import { useStateContext } from "../../contexts/Context";
import FetchUserInfo from "../../lib/api/fetchUserInfo";
import { getOrganisation } from "../../utils/getOrgs";
import ProductDropdown from "./ProductDropdown";
import useStore from "../../hooks/use-hook";
import PortfolioDropdown from "./PortfolioDropdown";
import { useNavigate } from "react-router";
import ImageModal from "../../components/ImageModal";
import SendFavourites from "../../lib/api/sendFavourite";

export default function AddFavourite() {
  const navigate = useNavigate();
  const { sessionId } = useStateContext();

  const [image, setImage] = useState(null);
  const [org, setOrg] = useState(null);
  const [product, setProduct] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [open, setOpen] = useState(false);

  const products = useStore((state) => state.products);
  const setOrgs = useStore((state) => state.setOrgs);
  const orgs = useStore((state) => state.orgs);

  const res = useQuery("fetchFav", async () => {
    const userInfo = await FetchUserInfo(sessionId);
    const other_org = userInfo.data.other_org || [];
    const own_org = userInfo.data.own_organisations || [];
    const updatedData = [...other_org, ...own_org];
    const orges = getOrganisation(updatedData);
    setOrgs(orges);
    return updatedData;
  });

  const { mutate, isLoading, error } = useMutation({
    mutationFn: (data) => SendFavourites(data),
    onSuccess: () => navigate(-1),
    onError: (err) => console.log("err", err),
  });

  const handleSubmit = () => {
    if (!org || !product || !portfolio || !image) {
      alert("Please select all the fields");
      return;
    }
    const formData = new FormData();
    formData.append("image_url", image);
    formData.append("action", true);
    formData.append("username", image.username);
    formData.append("productName", product);
    formData.append("portfolio", portfolio);
    formData.append("orgName", org);
    mutate(formData);
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
      />
      <div style={{ marginTop: 30, marginBottom: "auto" }}>
        <div>
          <span className={styles.spanStyle}>Select WorkSpace:</span>
          <DropdownComponent
            options={orgs?.map((item) => item.org_name) || []}
            setOrg={setOrg}
            data={res.data}
          />
        </div>
        <div style={{ marginTop: 20 }}>
          <span className={styles.spanStyle}>Select Product:</span>
          <ProductDropdown
            options={products?.map((item) => item.product)}
            setProduct={setProduct}
          />
        </div>
        <div style={{ marginTop: 20 }}>
          <span className={styles.spanStyle}>Select Portfolio:</span>
          <PortfolioDropdown product={product} setPortfolio={setPortfolio} />
        </div>
        {/* <div
          style={{ marginTop: 20, display: "flex", flexDirection: "column" }}
        > */}
        {/* <span className={styles.spanStyle}>
            Upload Image:
            {image && (
              <span className={styles.placeholderClassName}>{image.name}</span>
            )}
          </span>
          <input
            type="file"
            id="file"
            className={styles.inputStyle}
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <div className={styles.labelStyle}>
            <label htmlFor="file" className={styles.label}>
              Choose
            </label>
            <FiLink2 size={12} className={styles.icon} />
          </div> */}
        <div style={{ marginTop: 20 }} onClick={() => setOpen(true)}>
          <span className={styles.spanStyle}>
            Select Images:{image && "1 file chosen"}
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
          />
        }
      </div>
      <div style={{ marginTop: 15 }} onClick={handleSubmit}>
        <TabButton description={"Submit"} />
      </div>
    </div>
  );
}
