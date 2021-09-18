import React, { useEffect, useState } from "react";
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption, ListGroup, ListGroupItem } from 'reactstrap';
import { connect } from "react-redux";
import { setServices } from "../../redux/services/services.actions";

const Services = ({ setServices, services }) => {

  useEffect(() => {
    setServices();
  }, [setServices]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === services.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? services.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = services && services.map((servic, index) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={index}
      >
        <img src={servic.sSrc} alt={servic.sTitle} />
        {/* <CarouselCaption captionText={servic.sName} captionHeader={servic.sName} /> */}
        <CarouselCaption captionText={servic.sName} />
      </CarouselItem>
    );
  });

  return (
    <section className="services-section py-0 py-lg-4" id="services">

      <div className="services-container container">

        <div className="row">
          <div className="col-12">
            <h2 className="text-center py-3 font-weight-bolder">Our Expertise</h2>
          </div>
        </div>

        <div className="row d-flex align-items-center">

          <div className="col-12 col-sm-6 pr-sm-1">
            <Carousel
              activeIndex={activeIndex}
              next={next}
              previous={previous}
            >
              <CarouselIndicators items={services && services} activeIndex={activeIndex} onClickHandler={goToIndex} />
              {slides}
              <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
              <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
            </Carousel>
          </div>

          <div className="col-12 col-sm-6 pl-sm-1 mt-2 mt-sm-0">

            <ListGroup>
              {services && services.map((servic, index) =>
                <ListGroupItem key={index} color="secondary" className="text-dark font-weight-bolder text-uppercase py-1 py-sm-2">
                  {servic.sName}
                </ListGroupItem>)}
            </ListGroup>

          </div>

        </div>

      </div>
    </section>
  );
};

const mapStateToProps = state => ({
  services: state.servicesReducer.dataServices
})

export default connect(mapStateToProps, { setServices })(Services)