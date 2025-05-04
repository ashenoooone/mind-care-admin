import { TAppointment } from '@/entities/appointments';

export type Note = {
  appointmentDate: string;
  note: string;
  serviceName: string;
};

export const mapNotes = (
  appointments: TAppointment[]
): Note[] => {
  return appointments
    .map((appointment) => {
      if (!appointment.note) return undefined;

      const date =
        appointment.startTime || appointment.endTime;

      return {
        appointmentDate: new Date(
          date
        ).toLocaleDateString(),
        note: appointment.note,
        serviceName: appointment.service.name,
      };
    })
    .filter(Boolean) as Note[];
};

export type AiHints = Record<
  string,
  {
    problem: string;
    context: string;
    confidence: number;
    level: number;
    recommendation: string;
  }[]
>;
