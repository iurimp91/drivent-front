import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import { toast } from "react-toastify";

import useApi from "../../hooks/useApi";

import { DashWarning } from "../Dashboard/DashWarning";
import UserContext from "../../contexts/UserContext";

export default function ActivityForm() {
  const { booking } = useApi();
  const [isOnline, setIsOnline] = useState(null);
  const { userData } = useContext(UserContext);
  
  useEffect(() => {
    if(userData.bookingId) {
      booking.getBookingInfo()
        .then(response => {
          if(response.status === 200) {
            const bookDetails = response.data;
            setIsOnline(bookDetails.isOnline);
          };
        })
        .catch(() => {
          toast("Não foi possível encontrar sua reserva");
        });
    }
  }, []);

  return (
    <>
      <StyledTypography variant="h4" color="initial">Escolha de atividades</StyledTypography>
      {
        userData.paid
          ? isOnline
            ? <DashWarning variant="h6">
              Sua modalidade de ingresso não necessita escolher <br/> atividade. Você terá acesso a todas as atividades.
            </DashWarning>
            : "Em Breveeeee"
          : <DashWarning variant="h6">
              Você precisa ter confirmado pagamento antes <br/> de fazer a escolha de atividades
          </DashWarning>
      }
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;