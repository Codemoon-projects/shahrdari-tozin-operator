interface ReportModalProps {
  messageModalOpen: "violation" | "vehicle";
  reportType: "violation" | "vehicle";
  handleCloseModal: () => void;
  handleSendMessage: () => void;
  success: boolean;
  loading: boolean;
  driverName: any;
  driverNumber: any;
  carPlaque: any;
  carType: any;
  companyName: any;
  desc: any;
  setDriverName: any;
  setDriverNumber: any;
  setCarPlaque: any;
  setCarType: any;
  setCompanyName: any;
  setReportType: any;
  setDesc: any;
}

export default function ReportModal({
  messageModalOpen,
  success,
  handleCloseModal,
  handleSendMessage,
  loading,
  driverName,
  driverNumber,
  carPlaque,
  carType,
  companyName,
  desc,
  setDriverName,
  setDriverNumber,
  setCarPlaque,
  setCarType,
  setCompanyName,
  setReportType,
  setDesc,
  reportType,
}: ReportModalProps) {
  return (
    <div
      id="modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="fixed inset-0 bg-black/50"
        onClick={handleCloseModal}
      ></div>
      <div className="relative  bg-base-100 rounded-lg shadow-xl max-w-full max-h-full overflow-auto">
        <button
          onClick={handleCloseModal}
          className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
        <div className="p-4">
          <div className=" mx-auto bg-gray-50 h-full" dir="rtl">
            <div className="w-96">
              <h2 className="text-lg font-bold mb-4 text-gray-800 text-center">
                {messageModalOpen === "violation"
                  ? "گزارش تخلف"
                  : "درخواست ماشین جدید"}
              </h2>
              {success ? (
                <div className="text-green-600 text-center mb-4">
                  پیام با موفقیت ارسال شد.
                </div>
              ) : (
                <>
                  <input
                    className="w-full border border-gray-300 rounded-lg p-2 mb-2"
                    placeholder="نام راننده"
                    value={driverName}
                    onChange={(e) => setDriverName(e.target.value)}
                    disabled={loading}
                  />
                  <input
                    className="w-full border border-gray-300 rounded-lg p-2 mb-2"
                    placeholder="شماره تماس"
                    value={driverNumber}
                    onChange={(e) => setDriverNumber(e.target.value)}
                    disabled={loading}
                  />
                  <input
                    className="w-full border border-gray-300 rounded-lg p-2 mb-2"
                    placeholder="پلاک ماشین"
                    value={carPlaque}
                    onChange={(e) => setCarPlaque(e.target.value)}
                    disabled={loading}
                  />
                  <input
                    className="w-full border border-gray-300 rounded-lg p-2 mb-2"
                    placeholder="نوع ماشین"
                    value={carType}
                    onChange={(e) => setCarType(e.target.value)}
                    disabled={loading}
                  />
                  <input
                    className="w-full border border-gray-300 rounded-lg p-2 mb-2"
                    placeholder="نام شرکت"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    disabled={loading}
                  />
                  <select
                    className="w-full border border-gray-300 rounded-lg p-2 mb-2"
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    disabled={loading}
                  >
                    <option value="violation">گزارش تخلف</option>
                    <option value="request_car">درخواست ماشین جدید</option>
                  </select>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg p-2 mb-4 min-h-[100px]"
                    placeholder="توضیحات"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    disabled={loading}
                  />
                  <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                    onClick={handleSendMessage}
                    disabled={
                      loading ||
                      !driverName.trim() ||
                      !driverNumber.trim() ||
                      !carPlaque.trim() ||
                      !carType.trim() ||
                      !companyName.trim() ||
                      !desc.trim()
                    }
                  >
                    {loading ? "در حال ارسال..." : "ارسال"}
                  </button>
                </>
              )}
              <button
                className="w-full mt-2 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg font-medium transition-colors"
                onClick={handleCloseModal}
                disabled={loading}
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
