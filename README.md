<h1>Beta - Đồ án môn Lập trình tích hợp nâng cao</h1>
    <h2>Mô tả dự án</h2>
    <p>Beta là một đồ án môn Lập trình tích hợp nâng cao, được xây dựng theo mô hình MVC (Model-View-Controller). Dự án sử dụng các công nghệ hiện đại cho cả FrontEnd và BackEnd, nhằm tạo ra một ứng dụng web hoàn chỉnh.</p>
    <h2>Công nghệ sử dụng</h2>
    <h3>FrontEnd</h3>
    <ul>
        <li><strong>HTML/CSS/JavaScript</strong>: Các công nghệ cơ bản để xây dựng giao diện người dùng.</li>
        <li><strong>EJS</strong>: Một công cụ template cho phép chèn mã JavaScript vào HTML.</li>
        <li><strong>Axios</strong>: Thư viện HTTP Client dựa trên Promise, giúp thực hiện các yêu cầu HTTP từ trình duyệt và Node.js.</li>
    </ul>
    <h3>BackEnd</h3>
    <ul>
        <li><strong>Node.js</strong>: Môi trường chạy JavaScript trên server.</li>
        <li><strong>ExpressJS</strong>: Framework cho Node.js giúp xây dựng các ứng dụng web và API nhanh chóng và dễ dàng.</li>
        <li><strong>MongoDB</strong>: Cơ sở dữ liệu NoSQL, dùng để lưu trữ dữ liệu của dự án.</li>
    </ul>
    <h2>Cấu trúc dự án</h2>
    <pre>
<code>
Beta/
├── public/                 # Chứa các file tĩnh (CSS, JS, images, ...)
├── views/                  # Chứa các file EJS template
├── routes/                 # Chứa các file định tuyến của ứng dụng
├── models/                 # Chứa các file mô hình (Models) kết nối MongoDB
├── controllers/            # Chứa các file điều khiển (Controllers) xử lý logic ứng dụng
├── app.js                  # File chính của ứng dụng, khởi tạo server
├── package.json            # File quản lý các package và thông tin dự án
└── README.md               # File tài liệu dự án
</code>
    </pre>
    <h2>Cài đặt</h2>
    <ol>
        <li><strong>Clone dự án về máy</strong>
            <pre><code>git clone https://github.com/yourusername/beta.git
cd beta</code></pre>
        </li>
        <li><strong>Cài đặt các package cần thiết</strong>
            <pre><code>npm install</code></pre>
        </li>
        <li><strong>Cấu hình cơ sở dữ liệu</strong>
            <p>Tạo file <code>.env</code> trong thư mục gốc của dự án và thêm các cấu hình sau:</p>
            <pre><code>MONGODB_URI=mongodb://localhost:27017/beta
PORT=3000</code></pre>
        </li>
        <li><strong>Chạy ứng dụng</strong>
            <pre><code>npm start</code></pre>
        </li>
        <li><strong>Truy cập ứng dụng</strong>
            <p>Mở trình duyệt và truy cập <code>http://localhost:3000</code>.</p>
        </li>
    </ol>
    <h2>Sử dụng</h2>
    <h3>Các tính năng chính</h3>
    <ul>
        <li><strong>Tạo, đọc, cập nhật, xóa (CRUD)</strong>: Quản lý các đối tượng dữ liệu trong MongoDB.</li>
        <li><strong>Giao diện người dùng động</strong>: Sử dụng EJS và Axios để tạo các trang web động và tương tác.</li>
    </ul>
    <h3>Thư mục public</h3>
    <p>Chứa các file tĩnh như CSS, JavaScript và hình ảnh.</p>
    <h3>Thư mục views</h3>
    <p>Chứa các file EJS template để render các trang web.</p>
    <h3>Thư mục routes</h3>
    <p>Chứa các file định tuyến, định nghĩa các API endpoint của ứng dụng.</p>
    <h3>Thư mục models</h3>
    <p>Chứa các file mô hình, định nghĩa cấu trúc dữ liệu và kết nối với MongoDB.</p>
    <h3>Thư mục controllers</h3>
    <p>Chứa các file điều khiển, xử lý logic của ứng dụng.</p>
    <h2>Đóng góp</h2>
    <ol>
        <li>Fork dự án.</li>
        <li>Tạo nhánh mới (<code>git checkout -b feature/feature-name</code>).</li>
        <li>Commit các thay đổi (<code>git commit -am 'Add new feature'</code>).</li>
        <li>Đẩy nhánh lên (<code>git push origin feature/feature-name</code>).</li>
        <li>Tạo một Pull Request.</li>
    </ol>
    <h2>Giấy phép</h2>
    <hr>
    <p>Cảm ơn bạn đã sử dụng và đóng góp cho dự án Beta!</p>
