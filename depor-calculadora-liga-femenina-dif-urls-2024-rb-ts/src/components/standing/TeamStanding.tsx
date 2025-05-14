import Image from "react-bootstrap/Image";

//constants
import { urlShields } from "../../Constants";

//types
import { Standing } from "../../types/types";

type TeamStandingProps = Standing & {
  id: string;
  position: number;
  positionClass: string;
};

const TeamStanding = ({
  id,
  position,
  positionClass,
  name,
  playedMatches,
  wonMatches,
  drawnMatches,
  lostMatches,
  goalsFor,
  goalsAgainst,
  goalsDifference,
  points,
}: TeamStandingProps) => {
  return (
    <tr
      className={`border-bottom border-white align-middle standing-data ${positionClass}`}
    >
      <td>
        <span
          className={`align-bottom ${
            position === 1 || position === 2 ? "text-white" : ""
          }`}
        >
          {position}
        </span>
      </td>
      <td>
        <article className="d-flex align-items-center justify-content-start">
          <div className="table-team">
            <Image
              className="pe-1 pe-md-2"
              src={`${urlShields}/img/escudos/${id}.png`}
              alt={name}
              loading="lazy"
            />
          </div>
          <span
            className={`ms-1 ms-md-3 text-start text-md-center ${
              position === 1 || position === 2 ? "text-white" : ""
            }`}
          >
            {name}
          </span>
        </article>
      </td>
      <td>
        <span
          className={`align-bottom ${
            position === 1 || position === 2 ? "text-white" : ""
          }`}
        >
          {playedMatches}
        </span>
      </td>
      <td>
        <span
          className={`align-bottom ${
            position === 1 || position === 2 ? "text-white" : ""
          }`}
        >
          {wonMatches}
        </span>
      </td>
      <td>
        <span
          className={`align-bottom ${
            position === 1 || position === 2 ? "text-white" : ""
          }`}
        >
          {drawnMatches}
        </span>
      </td>
      <td>
        <span
          className={`align-bottom ${
            position === 1 || position === 2 ? "text-white" : ""
          }`}
        >
          {lostMatches}
        </span>
      </td>
      <td>
        <span
          className={`align-bottom ${
            position === 1 || position === 2 ? "text-white" : ""
          }`}
        >
          {goalsFor}
        </span>
      </td>
      <td>
        <span
          className={`align-bottom ${
            position === 1 || position === 2 ? "text-white" : ""
          }`}
        >
          {goalsAgainst}
        </span>
      </td>
      <td>
        <span
          className={`align-bottom ${
            position === 1 || position === 2 ? "text-white" : ""
          }`}
        >
          {goalsDifference}
        </span>
      </td>
      <td>
        <span
          className={`align-bottom fw-bolder ${
            position === 1 || position === 2 ? "text-white" : ""
          }`}
        >
          {points}
        </span>
      </td>
    </tr>
  );
};

export default TeamStanding;
