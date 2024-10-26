export default function LoginPage() {
    return (
        <div style={containerStyle}>
            <div style={formContainerStyle}>
                <h1 style={titleStyle}>ВХІД</h1>
                <form style={formStyle}>
                    <div style={formGroupStyle}>
                        <label htmlFor="username" style={labelStyle}>Username</label>
                        <input type="text" id="username" name="username" style={inputStyle}/>
                    </div>

                    <div style={formGroupStyle}>
                        <label htmlFor="password" style={labelStyle}>Password</label>
                        <input type="password" id="password" name="password" style={inputStyle}/>
                    </div>

                    <button type="submit" style={buttonStyle}>Login</button>
                    <button type="submit" style={buttonStyle}>Register</button>
                </form>
            </div>
        </div>
    );
}

// Стилі для сторінки, форми, полів введення та кнопки
const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#1A1A1D",
};

const formContainerStyle = {
    width: "400px",
    padding: "40px",
    backgroundColor: "#2E2E2E",
    borderRadius: "12px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
};

const titleStyle = {
    color: "#FFA500",
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "20px",
};

const formStyle = {
    display: "flex",
    flexDirection: "column",
};

const formGroupStyle = {
    marginBottom: "20px",
    textAlign: "left",
};

const labelStyle = {
    color: "#F0F0F0",
    fontSize: "16px",
    marginBottom: "8px",
    display: "block",
};

const inputStyle = {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #333",
    backgroundColor: "#1A1A1D",
    color: "#F0F0F0",
};

const buttonStyle = {
    width: "100%",
    padding: "14px",
    margin: "14px 0 0 0",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#1A1A1D",
    backgroundColor: "#FFA500",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "background 0.3s",
};



