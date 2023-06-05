import classes from "./styles.module.scss";
import { useAuth } from "../../hooks/useAuth.tsx";

const Welcome = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <div className={classes.Welcome}>
      <h3 className="text-center text-white pb-3">Welcome</h3>
      <p className="text-center text-white">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
        nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
        volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
        ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
        Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
        molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero
        eros et accumsan et iusto odio dignissim qui blandit praesent luptatum
        zzril delenit augue duis dolore te feugait nulla facilisi.Lorem ipsum
        dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
        euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi
        enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit
        lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum
        iriure dolor in hendrerit in vulputate velit esse molestie consequat,
        vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et
        iusto odio dignissim qui blandit praesent luptatum zzril delenit augue
        duis dolore te feugait nulla facilisi.Lorem ipsum dolor sit amet,
        consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
        laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim
        veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut
        aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in
        hendrerit in vulputate velit esse molestie consequat, vel illum dolore
        eu feugiat nulla facilisis at vero eros et accumsan et iusto odio
        dignissim qui blandit praesent luptatum zzril delenit augue duis dolore
        te feugait nulla facilisi.Lorem ipsum dolor sit amet, consectetuer
        adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
        dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
        nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex
        ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in
        vulputate velit esse molestie consequat, vel illum dolore eu feugiat
        nulla facilisis at vero eros et accumsan et iusto odio dignissim qui
        blandit praesent luptatum zzril delenit augue duis dolore te feugait
        nulla facilisi.Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
        sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
        erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
        ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
        Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
        molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero
        eros et accumsan et iusto odio dignissim qui blandit praesent luptatum
        zzril delenit augue duis dolore te feugait nulla facilisi.
      </p>
    </div>
  );
};

export default Welcome;
