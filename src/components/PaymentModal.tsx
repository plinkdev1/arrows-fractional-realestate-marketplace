import React, { useState } from 'react';
import MultiStepForm from './MultiStepForm';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  return (
    <MultiStepForm isOpen={isOpen} onClose={onClose} />
  );
};

export default PaymentModal;