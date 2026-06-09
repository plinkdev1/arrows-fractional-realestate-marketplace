import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { supabase } from '../../../lib/supabase';
import { Calendar, Clock, Video, Phone, CheckCircle, Download, X } from 'lucide-react';

interface Consultation {
  id: string;
  scheduled_date: string | null;
  duration_minutes: number;
  status: string;
  meeting_link: string | null;
  notes: string | null;
  recording_url: string | null;
  transcript_url: string | null;
}

export const ClientConsultation: React.FC = () => {
  const { user } = useAuth();
  const [consultation, setConsultation] = useState<Consultation | null>(null);
  const [loading, setLoading] = useState(true);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [language, setLanguage] = useState('english');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (user) {
      loadConsultation();
    }
  }, [user]);

  const loadConsultation = async () => {
    try {
      const { data, error } = await supabase
        .from('consultations')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        const { data: newConsultation, error: createError } = await supabase
          .from('consultations')
          .insert({
            user_id: user?.id,
            status: 'not_scheduled'
          })
          .select()
          .single();

        if (createError) throw createError;
        setConsultation(newConsultation);
      } else {
        setConsultation(data);
      }
    } catch (error) {
      console.error('Error loading consultation:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSchedule = async () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time');
      return;
    }

    try {
      const scheduledDateTime = new Date(`${selectedDate}T${selectedTime}`);

      const { error } = await supabase
        .from('consultations')
        .update({
          scheduled_date: scheduledDateTime.toISOString(),
          status: 'scheduled',
          meeting_link: 'https://meet.arrows.com/consultation-' + consultation?.id,
          notes
        })
        .eq('id', consultation?.id);

      if (error) throw error;

      await loadConsultation();
      setShowScheduleModal(false);
      alert('Consultation scheduled successfully! You will receive a confirmation email shortly.');
    } catch (error) {
      console.error('Error scheduling consultation:', error);
      alert('Failed to schedule consultation. Please try again.');
    }
  };

  const handleCancel = async () => {
    if (!confirm('Are you sure you want to cancel this consultation?')) return;

    try {
      const { error } = await supabase
        .from('consultations')
        .update({
          status: 'cancelled',
          scheduled_date: null,
          meeting_link: null
        })
        .eq('id', consultation?.id);

      if (error) throw error;
      await loadConsultation();
    } catch (error) {
      console.error('Error cancelling consultation:', error);
    }
  };

  const getAvailableTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    return slots;
  };

  const getNextAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date.toISOString().split('T')[0]);
      }
    }
    return dates;
  };

  const getTimeUntilCall = () => {
    if (!consultation?.scheduled_date) return null;
    const now = new Date();
    const callDate = new Date(consultation.scheduled_date);
    const diff = callDate.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours < 0) return null;
    if (hours < 24) return `${hours}h ${minutes}m`;
    const days = Math.floor(hours / 24);
    return `${days} day${days !== 1 ? 's' : ''}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-brown">Loading consultation...</p>
        </div>
      </div>
    );
  }

  if (!consultation) {
    return <div className="text-center py-12">Error loading consultation data</div>;
  }

  const isScheduled = consultation.status === 'scheduled';
  const isCompleted = consultation.status === 'completed';
  const timeUntil = getTimeUntilCall();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-brown">Consultation Call</h1>
          <p className="text-brown/60 mt-1">Schedule your free 30-minute consultation</p>
        </div>
      </div>

      {!isScheduled && !isCompleted && (
        <div className="bg-gradient-to-r from-gold to-amber-600 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Schedule Your Free Consultation</h2>
          <p className="mb-6 opacity-90">
            Book your 30-minute video call with one of our investment experts to discuss your assessment
            and answer any questions you may have.
          </p>
          <button
            onClick={() => setShowScheduleModal(true)}
            className="px-6 py-3 bg-white text-gold rounded-lg hover:bg-cream transition-colors font-semibold"
          >
            Schedule Now
          </button>
        </div>
      )}

      {isScheduled && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-green-800 text-lg mb-1">Consultation Scheduled</h3>
                <p className="text-green-700">Your consultation is confirmed</p>
              </div>
            </div>
            {timeUntil && (
              <div className="text-right">
                <div className="text-sm text-green-700">Starts in</div>
                <div className="text-2xl font-bold text-green-800">{timeUntil}</div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg p-4 space-y-3">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-brown/60" />
              <div>
                <div className="text-sm text-brown/60">Date & Time</div>
                <div className="font-medium text-brown">
                  {new Date(consultation.scheduled_date!).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })} at {new Date(consultation.scheduled_date!).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-brown/60" />
              <div>
                <div className="text-sm text-brown/60">Duration</div>
                <div className="font-medium text-brown">{consultation.duration_minutes} minutes</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Video className="w-5 h-5 text-brown/60" />
              <div>
                <div className="text-sm text-brown/60">Meeting Link</div>
                <a href={consultation.meeting_link || '#'} target="_blank" rel="noopener noreferrer" className="font-medium text-gold hover:underline">
                  Join Video Call
                </a>
              </div>
            </div>
          </div>

          <div className="mt-4 flex space-x-3">
            <a
              href={consultation.meeting_link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-2 bg-green-600 text-white text-center rounded-lg hover:bg-green-700 transition-colors"
            >
              Join Call
            </a>
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {isCompleted && (
        <div className="bg-white rounded-lg p-6 border border-gold/20">
          <div className="flex items-start space-x-3 mb-4">
            <CheckCircle className="w-6 h-6 text-gold flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-brown text-lg mb-1">Consultation Completed</h3>
              <p className="text-brown/70">Your consultation was completed on {new Date(consultation.scheduled_date!).toLocaleDateString()}</p>
            </div>
          </div>

          {(consultation.recording_url || consultation.transcript_url) && (
            <div className="space-y-3 mt-4">
              {consultation.recording_url && (
                <a
                  href={consultation.recording_url}
                  className="flex items-center justify-between p-3 bg-gold/10 rounded-lg hover:bg-gold/20 transition-colors"
                >
                  <span className="text-brown font-medium">Download Recording</span>
                  <Download className="w-5 h-5 text-gold" />
                </a>
              )}
              {consultation.transcript_url && (
                <a
                  href={consultation.transcript_url}
                  className="flex items-center justify-between p-3 bg-gold/10 rounded-lg hover:bg-gold/20 transition-colors"
                >
                  <span className="text-brown font-medium">Download Transcript</span>
                  <Download className="w-5 h-5 text-gold" />
                </a>
              )}
            </div>
          )}

          {consultation.notes && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-brown mb-2">Consultant Notes</h4>
              <p className="text-brown/70">{consultation.notes}</p>
            </div>
          )}

          <button
            onClick={() => alert('Additional consultations can be purchased. Contact support for pricing.')}
            className="mt-4 w-full px-4 py-2 border border-gold text-gold rounded-lg hover:bg-gold/10 transition-colors"
          >
            Schedule Additional Consultation
          </button>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gold/20">
          <h3 className="font-semibold text-brown mb-4">What to Expect</h3>
          <ul className="space-y-3">
            <li className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
              <span className="text-brown/70">Review your personalized assessment in detail</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
              <span className="text-brown/70">Discuss property recommendations and strategy</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
              <span className="text-brown/70">Get answers to all your investment questions</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
              <span className="text-brown/70">Understand next steps in your journey</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gold/20">
          <h3 className="font-semibold text-brown mb-4">Preparation Tips</h3>
          <ul className="space-y-3">
            <li className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
              <span className="text-brown/70">Review your assessment report before the call</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
              <span className="text-brown/70">Prepare a list of questions you want to ask</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
              <span className="text-brown/70">Test your camera and microphone beforehand</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
              <span className="text-brown/70">Have a notepad ready to take notes</span>
            </li>
          </ul>
        </div>
      </div>

      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-brown">Schedule Consultation</h3>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-brown" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-brown mb-2">Select Date</label>
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                >
                  <option value="">Choose a date</option>
                  {getNextAvailableDates().map(date => (
                    <option key={date} value={date}>
                      {new Date(date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-brown mb-2">Select Time</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-4 py-2 border border-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                >
                  <option value="">Choose a time</option>
                  {getAvailableTimeSlots().map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-brown mb-2">Language Preference</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-2 border border-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                >
                  <option value="english">English</option>
                  <option value="portuguese">Portuguese</option>
                  <option value="spanish">Spanish</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-brown mb-2">
                  Special Requests or Topics (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                  placeholder="Let us know what you'd like to focus on during the consultation..."
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleSchedule}
                  className="flex-1 px-6 py-3 bg-gold text-white rounded-lg hover:bg-gold/90 transition-colors font-semibold"
                >
                  Confirm Booking
                </button>
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
