import React, { useState, useEffect } from 'react';
import { OrderRecord, OrderStatus } from '../types/pizza';
import { X, CheckCircle2, Flame, Bike, Box, ChefHat, Clock, Phone, MapPin } from 'lucide-react';
import { PIZZA_SIZES, CRUST_OPTIONS } from '../data/menu';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderRecord | null;
  onUpdateOrderStatus?: (orderId: string, status: OrderStatus) => void;
}

const ORDER_STEPS: { status: OrderStatus; label: string; description: string; icon: any }[] = [
  {
    status: 'received',
    label: 'Order Confirmed',
    description: 'Received by kitchen. Dough balls brought to room temp.',
    icon: CheckCircle2,
  },
  {
    status: 'kneading',
    label: 'Hand-Stretching & Topping',
    description: 'Pizzaiolo stretching 48-hr fermented sourdough dough.',
    icon: ChefHat,
  },
  {
    status: 'wood-fired',
    label: 'In 900°F Wood-Fired Oven',
    description: 'Baking over oak embers for 90 seconds. Crust blistering.',
    icon: Flame,
  },
  {
    status: 'boxed',
    label: 'Quality Check & Slicing',
    description: 'Drizzled with cold-pressed olive oil, boxed in thermal insulated carton.',
    icon: Box,
  },
  {
    status: 'en-route',
    label: 'Out for Doorstep Delivery',
    description: 'Courier Matteo on thermal insulated Vespa en route.',
    icon: Bike,
  },
  {
    status: 'delivered',
    label: 'Delivered / Ready!',
    description: 'Arrived hot and piping fresh. Buon appetito!',
    icon: CheckCircle2,
  },
];

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  order,
  onUpdateOrderStatus,
}) => {
  if (!isOpen || !order) return null;

  const currentStepIndex = ORDER_STEPS.findIndex((s) => s.status === order.status);

  // Auto-progress simulation for delightful live demonstration
  const handleAdvanceStep = () => {
    if (currentStepIndex < ORDER_STEPS.length - 1 && onUpdateOrderStatus) {
      const nextStatus = ORDER_STEPS[currentStepIndex + 1].status;
      onUpdateOrderStatus(order.orderId, nextStatus);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tracker-title"
    >
      <div className="relative w-full max-w-2xl bg-[#161412] border border-[#2E2822] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-[#26221D] flex items-center justify-between bg-[#1A1815]">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-[#E25822] font-semibold">
                Live Kitchen Radar
              </span>
              <span className="text-[#9E968B]" aria-hidden="true">·</span>
              <span className="font-mono text-xs text-[#EDE8DF] font-bold">
                Order #{order.orderId}
              </span>
            </div>
            <h2 id="tracker-title" className="font-display font-bold text-xl text-white mt-0.5">
              {order.status === 'delivered'
                ? 'Order Completed'
                : `Estimated Delivery: ~${Math.max(5, order.estimatedMinutes - (currentStepIndex * 5))} mins`}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#9E968B] hover:text-white rounded-lg hover:bg-[#25211C] transition-colors"
            aria-label="Close order tracker"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Animated Stepper */}
          <div className="p-4 bg-[#1C1A17] border border-[#2B2721] rounded-xl space-y-4">
            {ORDER_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isPassed = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;

              return (
                <div key={step.status} className="flex items-start gap-3.5 relative">
                  {/* Vertical connecting line */}
                  {idx < ORDER_STEPS.length - 1 && (
                    <div
                      className={`absolute left-4 top-8 bottom-0 w-0.5 -ml-[1px] ${
                        idx < currentStepIndex ? 'bg-[#E25822]' : 'bg-[#2E2822]'
                      }`}
                    />
                  )}

                  {/* Icon Node */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${
                      isPassed
                        ? 'bg-emerald-600 text-white'
                        : isCurrent
                        ? 'bg-[#E25822] text-white shadow-[0_0_12px_rgba(226,88,34,0.6)] animate-pulse'
                        : 'bg-[#26221D] text-[#6F675C]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Text Details */}
                  <div className="flex-1 pt-0.5">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-semibold ${
                          isCurrent
                            ? 'text-white'
                            : isPassed
                            ? 'text-[#EDE8DF]'
                            : 'text-[#6F675C]'
                        }`}
                      >
                        {step.label}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] text-[#E25822] font-mono uppercase tracking-wider font-bold">
                          Active Phase
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#9E968B] mt-0.5 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Demo Step Advancer */}
          {currentStepIndex < ORDER_STEPS.length - 1 && (
            <div className="p-3 bg-[#1B1916] border border-[#2D2822] rounded-xl flex items-center justify-between">
              <span className="text-[11px] text-[#9E968B]">
                Demonstration control: Fast-forward oven stage
              </span>
              <button
                type="button"
                onClick={handleAdvanceStep}
                className="px-3 py-1.5 bg-[#2B2721] hover:bg-[#3B342C] text-xs font-medium text-white rounded-lg transition-colors cursor-pointer"
              >
                Advance Status →
              </button>
            </div>
          )}

          {/* Courier / Kitchen Contact Card */}
          <div className="p-4 bg-[#191714] border border-[#2B2721] rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E25822]/20 border border-[#E25822]/40 flex items-center justify-center text-[#E25822] font-semibold text-sm">
                MP
              </div>
              <div>
                <div className="text-xs font-semibold text-[#EDE8DF]">Courier Matteo P.</div>
                <div className="text-[11px] text-[#9E968B]">Electric Vespa · Thermal Insulated Pouch</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-emerald-400 font-medium">On Schedule</span>
            </div>
          </div>

          {/* Delivery Destination */}
          <div className="p-3.5 bg-[#1B1916] border border-[#2D2822] rounded-xl text-xs space-y-1">
            <div className="text-[#9E968B] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#E25822]" />
              <span>{order.orderType === 'delivery' ? 'Delivery Destination' : 'Pickup Location'}</span>
            </div>
            <div className="font-medium text-[#EDE8DF] pl-5">{order.customer.address}</div>
            {order.customer.apartment && (
              <div className="text-[11px] text-[#9E968B] pl-5">Apt: {order.customer.apartment}</div>
            )}
            {order.customer.notes && (
              <div className="text-[11px] text-[#7C756B] italic pl-5">
                Note: "{order.customer.notes}"
              </div>
            )}
          </div>

          {/* Itemized Order Receipt */}
          <div className="border-t border-[#26221D] pt-4 space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#9E968B]">
              Ordered Items
            </div>
            <div className="space-y-2">
              {order.items.map((item, idx) => {
                const size = PIZZA_SIZES.find((s) => s.id === item.size);
                return (
                  <div key={idx} className="flex justify-between items-start text-xs">
                    <div>
                      <span className="font-medium text-[#EDE8DF]">
                        {item.quantity}x {item.product.name}
                      </span>
                      <div className="text-[11px] text-[#9E968B]">
                        {size?.name} · {item.crust}
                      </div>
                    </div>
                    <span className="font-mono tabular-nums text-[#EDE8DF]">
                      ${item.totalPrice.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-[#26221D] pt-3 space-y-1 text-xs text-[#9E968B]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums">${order.subtotal.toFixed(2)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount</span>
                  <span className="font-mono tabular-nums">-${order.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="font-mono tabular-nums">
                  {order.deliveryFee === 0 ? 'FREE' : `$${order.deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tip</span>
                <span className="font-mono tabular-nums">${order.tip.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-white pt-2 border-t border-[#29241E]">
                <span>Total Paid</span>
                <span className="font-mono tabular-nums text-[#E25822] text-base">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
