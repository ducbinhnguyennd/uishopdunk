import React from "react";
import "./DoiTra.scss"; 

const DoiTra = () => {
  return (
    <div id="doi-tra">
      <h2 className="title">CHÍNH SÁCH GIAO HÀNG – ĐỔI TRẢ</h2>
      <p className="description">
        Với mong muốn đem đến cho quý khách những sản phẩm chất lượng cao và ưng ý nhất.
        Chúng tôi có những quy định đổi trả để đảm bảo quyền lợi cho mọi quý khách hàng như sau:
      </p>
      <h4 className="subtitle">1– Khi nhận hàng từ nhân viên giao hàng:</h4>
      <p className="doitra-text">
        Quý khách tiến hành mở hàng kiểm tra sản phẩm. Nếu sản phẩm không đúng như thông tin đặt hàng, chất lượng kém
        quý khách có thể liên lạc ngay với tôi theo số <strong>0985963784</strong> để được giải quyết. Nếu không đảm bảo
        chất lượng chúng tôi sẽ hoàn lại 100% tiền cọc cho quý khách.
      </p>
      <h4 className="subtitle">2– Sau khi nhận sản phẩm:</h4>
      <p className="doitra-text">
        Trong thời hạn 7 ngày nếu sản phẩm có chất lượng kém, không đúng như giới thiệu, không đảm bảo chất lượng, chúng tôi
        sẽ hoàn trả quý khách 100% giá trị của hàng hóa. Để đảm bảo quý khách yên tâm 100% về chất lượng sản phẩm.
        Trong thời hạn 5 năm nếu sản phẩm có bất kì tình trạng nút hỏng hóc kể cả lỗi do phía khách hàng chúng tôi đều bảo hành
        phun PU miễn phí cho quý khách.
      </p>
    </div>
  );
};

export default DoiTra;
