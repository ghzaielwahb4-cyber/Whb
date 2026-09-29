import React, { useState } from 'react';
import { CartItem, OrderCustomerInfo, OrderRecord } from '../types/pizza';
import { X, CreditCard, ShieldCheck, MapPin, Phone, User, Clock, ArrowRight } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  orderType: 'delivery' | 'pickup';
  appliedPromo?: string;
  onOrderPlaced: (order: OrderRecord) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  orderType,
  appliedPromo,
  onOrderPlaced,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple-pay' | 'cash'>('card');
  const [tipAmount, setTipAmount] = useState<number>(3.0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const isFreeDelivery = subtotal >= 35.0 || appliedPromo === 'FREESHIP' || orderType === 'pickup';
  const deliveryFee = orderType === 'pickup' ? 0 : isFreeDelivery ? 0 : 3.99;
  
  let discount = 0;
  if (appliedPromo === 'FORNO15') {
    discount = Number((subtotal * 0.15).toFixed(2));
  } else if (appliedPromo === 'BUONAPPETITO') {
    discount = Math.min(5.0, subtotal);
  }

  const tax = Number(((subtotal - discount) * 0.08).toFixed(2));
  const finalTotal = Number((subtotal - discount + deliveryFee + tax + tipAmount).toFixed(2));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('Please enter a mobile phone number for order updates.');
      return;
    }
    if (orderType === 'delivery' && !address.trim()) {
      setErrorMessage('Please provide a delivery street address.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = `FN-${Math.floor(1000 + Math.random() * 9000)}`;
      const customer: OrderCustomerInfo = {
        name: name.trim(),
        phone: phone.trim(),
        address: orderType === 'delivery' ? address.trim() : '12 Via Forno, Napoli District',
        apartment: apartment.trim() || undefined,
        notes: notes.trim() || undefined,
        paymentMethod,
      };

      const newOrder: OrderRecord = {
        orderId,
        createdAt: Date.now(),
        items,
        subtotal,
        deliveryFee,
        discount,
        appliedCoupon: appliedPromo,
        tip: tipAmount,
        total: finalTotal,
        orderType,
        estimatedMinutes: orderType === 'delivery' ? 30 : 15,
        status: 'received',
        statusUpdatedAt: Date.now(),
        customer,
      };

      setIsSubmitting(false);
      onOrderPlaced(newOrder);
      onClose();
    }, 800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
    >
      <div className="relative w-full max-w-2xl bg-[#161412] border border-[#2E2822] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-[#26221D] flex items-center justify-between bg-[#1A1815]">
          <div>
            <h2 id="checkout-title" className="font-display font-bold text-lg text-white">
              Complete Your Pizza Order
            </h2>
            <div className="text-xs text-[#9E968B] mt-0.5 flex items-center gap-2">
              <span>{orderType === 'delivery' ? '🛵 Artisanal Doorstep Delivery' : '🏃 In-Store Stone Oven Pickup'}</span>
              <span aria-hidden="true">·</span>
              <span>{items.reduce((acc, i) => acc + i.quantity, 0)} Items</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#9E968B] hover:text-white rounded-lg hover:bg-[#25211C] transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {errorMessage && (
            <div className="p-3 bg-red-950/60 border border-red-800 text-red-300 rounded-lg">
              {errorMessage}
            </div>
          )}

          {/* Contact Details */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#9E968B] mb-3 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#E25822]" />
              <span>Contact Information</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-[#EDE8DF] mb-1">Your Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Sofia Rossi"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#1C1A17] border border-[#2D2822] rounded-lg text-[#EDE8DF] placeholder-[#6D655A] focus:outline-none focus:border-[#E25822]"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#EDE8DF] mb-1">Mobile Phone (for driver SMS)</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 019-2834"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-[#1C1A17] border border-[#2D2822] rounded-lg text-[#EDE8DF] placeholder-[#6D655A] focus:outline-none focus:border-[#E25822]"
                />
              </div>
            </div>
          </div>

          {/* Fulfillment Address / Pickup Location */}
          {orderType === 'delivery' ? (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#9E968B] mb-3 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#E25822]" />
                <span>Delivery Address</span>
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] text-[#EDE8DF] mb-1">Street Address</label>
                  <input
                    type="text"
                    placeholder="e.g. 742 Evergreen Terrace"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 bg-[#1C1A17] border border-[#2D2822] rounded-lg text-[#EDE8DF] placeholder-[#6D655A] focus:outline-none focus:border-[#E25822]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-[#EDE8DF] mb-1">Apt, Suite, Gate Code (Optional)</label>
                    <input
                      type="text"
                      placeholder="Apt 4B / Buzzer 12"
                      value={apartment}
                      onChange={(e) => setApartment(e.target.value)}
                      className="w-full px-3 py-2 bg-[#1C1A17] border border-[#2D2822] rounded-lg text-[#EDE8DF] placeholder-[#6D655A] focus:outline-none focus:border-[#E25822]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#EDE8DF] mb-1">Drop-off Note (Optional)</label>
                    <input
                      type="text"
                      placeholder="Leave on porch bench"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3 py-2 bg-[#1C1A17] border border-[#2D2822] rounded-lg text-[#EDE8DF] placeholder-[#6D655A] focus:outline-none focus:border-[#E25822]"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3.5 bg-[#1B1815] border border-[#2E2822] rounded-xl flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#E25822] mt-0.5 shrink-0" />
              <div>
                <div className="font-semibold text-[#EDE8DF]">Pickup at Forno & Fuoco Flagship</div>
                <div className="text-[11px] text-[#9E968B] mt-0.5">
                  12 Via Forno, Napoli Artisan Quarter · Stone Oven Station #1
                </div>
                <div className="text-[11px] text-amber-400 mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Ready in approx. 15–20 minutes
                </div>
              </div>
            </div>
          )}

          {/* Payment Method */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#9E968B] mb-3 flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-[#E25822]" />
              <span>Payment Option</span>
            </h3>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  paymentMethod === 'card'
                    ? 'border-[#E25822] bg-[#E25822]/10 text-white font-medium'
                    : 'border-[#2C2721] bg-[#1C1A17] text-[#EDE8DF] hover:border-[#3D372F]'
                }`}
              >
                Credit Card
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('apple-pay')}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  paymentMethod === 'apple-pay'
                    ? 'border-[#E25822] bg-[#E25822]/10 text-white font-medium'
                    : 'border-[#2C2721] bg-[#1C1A17] text-[#EDE8DF] hover:border-[#3D372F]'
                }`}
              >
                Apple / Google Pay
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  paymentMethod === 'cash'
                    ? 'border-[#E25822] bg-[#E25822]/10 text-white font-medium'
                    : 'border-[#2C2721] bg-[#1C1A17] text-[#EDE8DF] hover:border-[#3D372F]'
                }`}
              >
                {orderType === 'delivery' ? 'Cash on Delivery' : 'Pay at Pickup'}
              </button>
            </div>

            {paymentMethod === 'card' && (
              <div className="p-3.5 bg-[#1B1916] border border-[#2D2822] rounded-xl space-y-2.5">
                <div>
                  <label className="block text-[11px] text-[#EDE8DF] mb-1">Card Number</label>
                  <input
                    type="text"
                    defaultValue="4242 •••• •••• 4242"
                    className="w-full px-3 py-1.5 font-mono text-xs bg-[#151311] border border-[#2D2822] rounded text-[#EDE8DF] focus:outline-none focus:border-[#E25822]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] text-[#EDE8DF] mb-1">Expires (MM/YY)</label>
                    <input
                      type="text"
                      defaultValue="08/28"
                      className="w-full px-3 py-1.5 font-mono text-xs bg-[#151311] border border-[#2D2822] rounded text-[#EDE8DF] focus:outline-none focus:border-[#E25822]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#EDE8DF] mb-1">Security Code (CVC)</label>
                    <input
                      type="text"
                      defaultValue="883"
                      className="w-full px-3 py-1.5 font-mono text-xs bg-[#151311] border border-[#2D2822] rounded text-[#EDE8DF] focus:outline-none focus:border-[#E25822]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Courier Tip (Artisan kitchen appreciation) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#9E968B]">
                Courier & Oven Team Tip
              </span>
              <span className="text-[11px] text-[#9E968B]">100% goes to staff</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[2.0, 3.0, 5.0, 0.0].map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setTipAmount(amount)}
                  className={`py-1.5 text-xs rounded-lg border font-mono tabular-nums transition-all ${
                    tipAmount === amount
                      ? 'border-[#E25822] bg-[#E25822]/15 text-white font-semibold'
                      : 'border-[#2C2721] bg-[#1C1A17] text-[#9E968B] hover:text-[#EDE8DF]'
                  }`}
                >
                  {amount === 0 ? 'No Tip' : `$${amount.toFixed(2)}`}
                </button>
              ))}
            </div>
          </div>

          {/* Security guarantee */}
          <div className="flex items-center gap-2 text-[11px] text-[#9E968B] pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>256-bit SSL encrypted checkout. Freshness & temperature guaranteed upon arrival.</span>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 bg-[#E25822] hover:bg-[#C94A1A] disabled:opacity-50 text-white font-medium text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Confirming with Kitchen...</span>
              ) : (
                <>
                  <span>Place Wood-Fired Order</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums font-bold">${finalTotal.toFixed(2)}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
