import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

function Slider() {
  return (
    <>
      <div className="container-fluid py-5">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Find the Best Place to stay</h2>
        </div>
        <OwlCarousel
          className="owl-theme"
          loop
          margin={10}
          items={3}
          nav={true}
        >
          <div className="item">
            <img
              src="https://i.pinimg.com/564x/96/9e/29/969e29466c4040aa181f7d80e6cac331.jpg"
              alt=""
              className="w-full h-64 object-cover"
            />
            {/* <h4>1</h4> */}
          </div>
          <div className="item">
            <img
              src="https://i.pinimg.com/564x/0f/8b/a5/0f8ba5b8d78ed7c43ababd190aafb282.jpg"
              alt=""
              className="w-full h-64 object-cover"
            />
            {/* <h4>2</h4> */}
          </div>
          <div className="item">
            <img
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8SG9tZSUyMGxvYW4lMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D"
              alt=""
              className="w-full h-64 object-cover"
            />
            {/* <h4>3</h4> */}
          </div>
          <div className="item">
            <img
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8SG9tZSUyMGxvYW4lMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D"
              alt=""
            />
            {/* <h4>4</h4> */}
          </div>
          <div className="item">
            <img
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8SG9tZSUyMGxvYW4lMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D"
              alt=""
            />
            {/* <h4>5</h4> */}
          </div>
          <div className="item">
            <img
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8SG9tZSUyMGxvYW4lMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D"
              alt=""
            />
            {/* <h4>6</h4> */}
          </div>
          <div className="item">
            <img
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8SG9tZSUyMGxvYW4lMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D"
              alt=""
            />
            {/* <h4>7</h4> */}
          </div>
        </OwlCarousel>
      </div>
    </>
  );
}

export default Slider;
