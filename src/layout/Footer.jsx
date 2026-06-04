//"use client";

import {Link} from "react-router-dom";
import { Share2, MapPin } from "lucide-react";

export default function HomeFooter() {
    return (
        <footer className="bg-gradient-to-r from-blue-100 to-emerald-100 text-gray-700">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    {/* About */}
                    <div>
                        <h3 className="text-xl font-bold text-black">ElderCare IOT</h3>
                        <p className="mt-4 text-sm">
CHƯA BIẾT                        </p>
                        <div className="mt-4 flex gap-3">
                            <button className="rounded-lg p-2 hover:bg-gray-800">
                                <MapPin className="h-5 w-5" />
                            </button>
                            <button className="rounded-lg p-2 hover:bg-gray-800">
                                <Share2 className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* About Links */}
                    <div>
                        <h4 className="font-semibold text-black">VỀ CHÚNG TÔI</h4>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li>
                                <Link href="#" className="hover:text-white">
                                    Hướng dẫn sử dụng
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white">
                                    Chính sách thuê sách
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white">
                                    Quy chuẩn kiểm định chất lượng
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white">
                                    Trung tâm trợ giúp và khiếu nại
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h4 className="font-semibold text-black">THÔNG TIN LIÊN HỆ</h4>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li>
                                <button className="text-black text-left">
                                    Địa điểm: Trường ĐH Bách khoa - ĐHQG-HCM, cơ sở 2
                                </button>
                            </li>
                            <li>
                                <button className="text-black text-left">
                                    Email: contact.eldercareIOT@gmail.com
                                </button>
                            </li>
                            <li>
                                <button className="text-black text-left">
                                    Số điện thoại: 0329 123 456
                                </button>
                            </li>
                            <li>
                                <button className="text-black text-left">
                                    Facebook: facebook.com/EduCart.HCMUT
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-semibold text-black">ĐĂNG KÝ NHẬN TIN</h4>
                        <p className="mt-2 text-sm">Cập nhật khuyến mãi và sản phẩm mới.</p>
                        <div className="mt-4 flex">
                            <input
                                type="email"
                                placeholder="Email của bạn"
                                className="flex-1 rounded-l-lg bg-white border border-gray-300 text-gray-700 px-4 py-2 text-sm  placeholder-gray-500 outline-none"
                            />
                            <button className="rounded-r-lg bg-emerald-500 hover:bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                                Đăng ký
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12">
                  <div className="flex justify-center">
                    <div className="h-px w-2/3 bg-gradient-to-r from-transparent via-gray-400/50 to-transparent"></div>
                    </div>

                  <p className="mt-6 text-center text-sm text-gray-500">
                  © 2026 ELDERCARE IOT GROUP. ALL RIGHTS RESERVED.
                  </p>
                </div>
            </div>
        </footer>
    );
}
